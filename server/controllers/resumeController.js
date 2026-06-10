import fs from 'fs';
import mammoth from 'mammoth';
import Groq from 'groq-sdk';
import dotenv from 'dotenv';
import { createRequire } from 'module';
import {analyzeGrammar} from "../services/grammarAnalyzer.js";

const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');
dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// ─── TEXT EXTRACTION ──────────────────────────────────────────────────────────
const extractText = async (file) => {
  const ext = file.originalname.split('.').pop().toLowerCase();
  const filePath = file.path;

  try {
    let text = '';
    if (ext === 'pdf') {
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdfParse(dataBuffer);
      text = data.text;
    } else if (ext === 'docx') {
      const result = await mammoth.extractRawText({ path: filePath });
      text = result.value;
    } else if (ext === 'md' || ext === 'tex' || ext === 'txt') {
      text = fs.readFileSync(filePath, 'utf-8');
    } else {
      throw new Error('Unsupported file format');
    }
    return text;
  } finally {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }
};

// ─── DETERMINISTIC FACT EXTRACTION (regex — cannot be biased) ─────────────────
const extractFactsDeterministically = (text) => {

  const lower = text.toLowerCase();
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);

  const buzzwords = [
  'hardworking',
  'team player',
  'quick learner',
  'motivated',
  'passionate',
  'detail oriented',
  'dynamic',
  'enthusiastic',
  'go getter'
];

const buzzwordCount =
  buzzwords.filter(word =>
    lower.includes(word)
  ).length;

const vagueImpactWords = [
  'significantly',
  'greatly',
  'substantially',
  'many',
  'numerous',
  'various',
  'enhanced'
];

const vagueImpactCount = lines.filter(line =>
  vagueImpactWords.some(word =>
    line.toLowerCase().includes(word)
  ) &&
  !/\d/.test(line)
).length;

  // Contact info
  const hasEmail   = /@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(text);
  const hasPhone   = /(\+?\d[\d\s\-(). ]{6,}\d)/.test(text);
  const hasLinkedIn = /linkedin\.com/i.test(text);
  const hasGitHub  = /github\.com/i.test(text);

  // Section headers via keyword matching
  const hasSummary  = /\b(summary|objective|profile|about me|about)\b/i.test(text);
  const hasWorkExp  = /\b(experience|employment|work history|professional experience|internship)\b/i.test(text);
  const hasEducation = /\b(education|academic|degree|bachelor|master|b\.?tech|m\.?tech|b\.?e\.?|m\.?e\.?|b\.?sc|m\.?sc|phd|university|college|institute)\b/i.test(text);
  const hasSkills   = /\b(skills|technologies|tech stack|technical skills|competencies|tools|languages)\b/i.test(text);
  const hasProjects = /\b(projects?|portfolio|personal projects?|academic projects?)\b/i.test(text);
  const hasCertifications = /\b(certifications?|certificates?|courses?|awards?)\b/i.test(text);

  const sectionCount = [hasSummary, hasWorkExp, hasEducation, hasSkills].filter(Boolean).length;
  const hasClearSectionHeaders = sectionCount >= 3;

  // Industry / technical keywords
  const techKeywords = [
    'javascript','python','java','react','node','sql','aws','docker','kubernetes',
    'machine learning','api','css','html','typescript','angular','vue','c++','c#',
    'ruby','php','swift','kotlin','flutter','tensorflow','pytorch','git','agile',
    'scrum','rest','graphql','mongodb','postgresql','mysql','redis','linux','azure',
    'gcp','ci/cd','devops','microservices','spring','django','fastapi','numpy','pandas',
    'bash','scala','hadoop','spark','tableau','figma','jira','jenkins'
  ];
  const matchedKeywords = techKeywords.filter(k => lower.includes(k));
  const hasIndustryKeywords = matchedKeywords.length >= 3;

  // Bullet points (lines starting with bullet characters or dashes)
  const bulletLines = lines.filter(l => /^([-•*▪◦→>]|\d+\.)/.test(l));
  const totalBullets = bulletLines.length;

  // Weak action verbs — passive, vague language that hurts ATS quality scoring
  const weakVerbPatterns = [
  /^[-•*▪]?\s*(responsible for|helped|assisted|worked on|was involved|participated in|contributed to|tasked with|duties include|in charge of|support|supporting|handled|involved in|collaborated on|exposed to|familiar with)/i
];
  const weakBullets = bulletLines.filter(l => weakVerbPatterns.some(p => p.test(l)));
  const weakVerbRatio = totalBullets > 0 ? weakBullets.length / totalBullets : 0;

  const strongActionVerbs = [
  'developed',
  'built',
  'implemented',
  'designed',
  'optimized',
  'created',
  'architected',
  'engineered',
  'automated',
  'deployed',
  'led',
  'improved'
];

const strongBullets = bulletLines.filter(line =>
  strongActionVerbs.some(verb =>
    line.toLowerCase().includes(verb)
  )
);

const strongActionRatio =
  totalBullets > 0
    ? strongBullets.length / totalBullets
    : 0;

    const impactKeywords = [
  'reduced',
  'increased',
  'improved',
  'saved',
  'optimized',
  'boosted',
  'cut',
  'achieved',
  'grew'
];

const impactLines = lines.filter(line =>
  impactKeywords.some(keyword =>
    line.toLowerCase().includes(keyword)
  ) &&
  /\d/.test(line)
);

const impactMetricRatio =
  totalBullets > 0
    ? impactLines.length / totalBullets
    : 0;

  // Quantified achievements
  const quantifiedLines = lines.filter(line =>
    /\b(\d+\.?\d*\s*(%|x|times|users|customers|projects?|clients?|hours?|ms|k|m|million|billion|requests?|transactions?|records?|lines?))\b/i.test(line)
    || /\b(increased|decreased|reduced|improved|optimized|grew|boosted|saved|cut|achieved)\b.{0,60}\b\d+/i.test(line)
    || /\b\d+\s*%/.test(line)
  );
  const quantifiedAchievementsCount = quantifiedLines.length;
  const quantRatio = totalBullets > 0 ? quantifiedLines.length / totalBullets : 0;
  
  // Word count — very short resumes lack substance
  const wordCount = text.split(/\s+/).filter(w => w.length > 0).length;

  // Complex formatting: many very short lines suggests multi-column PDF layout
  const shortLineCount = lines.filter(l => l.length < 15 && l.length > 1).length;
  const hasComplexFormatting = shortLineCount > lines.length * 0.35;

  // Inconsistent dates
  const hasMonthNameDates    = /\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*[\s.,]+\d{4}\b/i.test(text);
  const hasNumericMonthDates = /\b(0?[1-9]|1[0-2])\/\d{4}\b/.test(text);
  const hasInconsistentDates = hasMonthNameDates && hasNumericMonthDates;

  const facts = {
    hasEmail, hasPhone, hasLinkedIn, hasGitHub,
    hasSummary,
    hasWorkExperience: hasWorkExp,
    hasEducation,
    hasSkillsSection: hasSkills,
    hasProjects, hasCertifications,
    hasIndustryKeywords, matchedKeywords,
    hasClearSectionHeaders,
    hasComplexFormatting, hasInconsistentDates,
    totalBullets, weakBullets: weakBullets.length, weakVerbRatio,
    quantifiedAchievementsCount, quantRatio,
    wordCount,
    totalLines: lines.length,
    buzzwordCount,
    strongActionRatio,
    impactMetricRatio,
    vagueImpactCount
  };

  // Debug log — check your server terminal to see exactly what was detected
  console.log('\n=== RESUME FACTS DETECTED ===');
  console.log(JSON.stringify(facts, null, 2));
  console.log('=============================\n');

  return facts;
};

// ─── DETERMINISTIC SCORER ─────────────────────────────────────────────────────
const calculateScore = (facts, qualityPenalty = 0) => {
  let score = 100;
  const deductions = [];

  // 1. CONTACT INFO (max -18)
  if (!facts.hasEmail)    { score -= 6;  deductions.push('No email address found (-6)'); }
  if (!facts.hasPhone)    { score -= 6;  deductions.push('No phone number found (-6)'); }
  if (!facts.hasLinkedIn) { score -= 4;  deductions.push('No LinkedIn URL (-4)'); }
  if (!facts.hasGitHub)   { score -= 2;  deductions.push('No GitHub URL — recommended for tech roles (-2)'); }

  // 2. SECTION COMPLETENESS (max -32)
  if (!facts.hasSummary)        { score -= 8;  deductions.push('Missing professional summary (-8)'); }
  if (!facts.hasWorkExperience) { score -= 15; deductions.push('Missing work experience section (-15)'); }
  if (!facts.hasEducation)      { score -= 9;  deductions.push('Missing education section (-9)'); }

  // 3. SKILLS & KEYWORDS (max -20)
  if (!facts.hasSkillsSection)    { score -= 10; deductions.push('No dedicated skills section (-10)'); }
  if (!facts.hasIndustryKeywords) { score -= 7;  deductions.push('Few or no technical keywords detected (-7)'); }
  if (!facts.hasProjects)         { score -= 3;  deductions.push('No projects section (-3)'); }

  // 4. QUANTIFIED IMPACT — scored on RATIO, not raw count (max -15)
  if (facts.totalBullets === 0) {
    score -= 15; deductions.push('No bullet points found — experience not structured (-15)');
  } else if (facts.quantRatio === 0) {
    score -= 15; deductions.push('0% of bullet points have metrics — no quantified impact (-15)');
  } else if (facts.quantRatio < 0.15) {
    score -= 10; deductions.push(`Only ${Math.round(facts.quantRatio * 100)}% of bullets have metrics — needs more numbers (-10)`);
  } else if (facts.quantRatio < 0.30) {
    score -= 5;  deductions.push(`${Math.round(facts.quantRatio * 100)}% of bullets quantified — aim for >30% (-5)`);
  }
  if (facts.buzzwordCount > 5) {
  score -= 5;
  deductions.push(
    `${facts.buzzwordCount} resume buzzwords detected (-5)`
  );
}

  // 5. ACTION VERB QUALITY (max -10)
  if (facts.weakVerbRatio > 0.5) {
    score -= 10; deductions.push(`${Math.round(facts.weakVerbRatio * 100)}% of bullets use weak/passive verbs (-10)`);
  } else if (facts.weakVerbRatio > 0.25) {
    score -= 5;  deductions.push(`${Math.round(facts.weakVerbRatio * 100)}% of bullets use weak verbs — use stronger action verbs (-5)`);
  }

  // 6. CONTENT DEPTH (max -5)
  if (facts.wordCount < 200) {
    score -= 5; deductions.push(`Resume is very short (${facts.wordCount} words) — lacks substance (-5)`);
  }
  if (facts.vagueImpactCount > 0) {
  score -= Math.min(8, facts.vagueImpactCount);

  deductions.push(
    `${facts.vagueImpactCount} vague impact claims without evidence`
  );
}
  // 7. ATS FORMATTING (max -8)
  if (!facts.hasClearSectionHeaders) { score -= 5; deductions.push('Section headers unclear or missing (-5)'); }
  if (facts.hasComplexFormatting)    { score -= 5; deductions.push('Complex multi-column layout may not parse in ATS (-5)'); }
  if (facts.hasInconsistentDates)    { score -= 3; deductions.push('Inconsistent date formats (-3)'); }

  // 8. LLM QUALITY PENALTY — bounded 0-15, prevents inflation (max -15)
  const clampedPenalty = Math.min(25,Math.max(0,Math.round(qualityPenalty)));
  if (clampedPenalty > 0) {
    score -= clampedPenalty;
    deductions.push(`Content quality issues detected by AI review (-${clampedPenalty})`);
  }
   // 9. Impact Metric Ratio
   if (facts.impactMetricRatio < 0.10) {
  score -= 10;

  deductions.push(
    'Very few quantified achievements show actual impact (-10)'
  );
}
else if (facts.impactMetricRatio < 0.25) {
  score -= 5;

  deductions.push(
    'Impact metrics are limited (-5)'
  );
}
  return { score: Math.max(0, Math.min(100, score)), deductions };
};

// ─── MAIN CONTROLLER ──────────────────────────────────────────────────────────
export const analyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const text = await extractText(req.file);

    if (!text || text.trim() === '') {
      return res.status(400).json({ message: 'Could not extract text from the file' });
    }

    // STEP 1: Deterministic fact extraction via regex (no LLM, no bias)
    const facts = extractFactsDeterministically(text);
    const grammarAnalysis = await analyzeGrammar(text.substring(0, 10000));
    
    const grammarSummary =
  grammarAnalysis.issues
    .slice(0, 10)
    .map(i => i.message)
    .join('\n');
    let grammarScore = 100;
    const grammarCorrections =
  grammarAnalysis.issues.map(issue => ({
    text:
      text.substring(
        issue.offset,
        issue.offset + issue.length
      ),

    replacement:
      issue.replacement,

    message:
      issue.message
  }));

if (grammarAnalysis.totalIssues > 20) {
  grammarScore = 60;
}
else if (grammarAnalysis.totalIssues > 10) {
  grammarScore = 75;
}
else if (grammarAnalysis.totalIssues > 5) {
  grammarScore = 85;
}
else if (grammarAnalysis.totalIssues > 0) {
  grammarScore = 95;
}

    // STEP 3: Use LLM ONLY for qualitative written feedback + a bounded quality penalty
    const feedbackPrompt = `You are a strict tech recruiter reviewing a resume. Be honest and critical — not encouraging.

Resume Text:
"""
${text.substring(0, 8000)}
"""

Structural facts already detected:
- Has email: ${facts.hasEmail}, phone: ${facts.hasPhone}, LinkedIn: ${facts.hasLinkedIn}, GitHub: ${facts.hasGitHub}
- Has summary: ${facts.hasSummary}, work experience: ${facts.hasWorkExperience}, education: ${facts.hasEducation}
- Has skills section: ${facts.hasSkillsSection}, projects: ${facts.hasProjects}
- Total bullet points: ${facts.totalBullets}, quantified: ${facts.quantifiedAchievementsCount} (${Math.round(facts.quantRatio * 100)}%)
- Technical keywords matched: ${facts.matchedKeywords.slice(0, 10).join(', ') || 'none'}
- Word count: ${facts.wordCount}
- Grammar issues detected: ${grammarSummary}
Your job:
1. Write honest strong points, weak points, and suggestions.
2. Assign:

contentScore (0-100)
achievementScore (0-100)
projectQualityScore (0-100)

Also determine:

resumeLevel:
Junior
Mid
Senior

Also identify:

unsupportedSkills

Scoring Guidelines:

90-100:
Exceptional resume.
Strong achievements.
Quantified impact.
Recruiter-ready.

80-89:
Strong resume with some improvement areas.

70-79:
Average resume.
Needs stronger impact statements.

60-69:
Weak resume.
Generic bullets and limited achievements.

Below 60:
Poorly written resume.
Missing impact and substantial content.

Respond ONLY with this JSON:
{
  "contentScore": 0,
  "achievementScore": 0,
  "projectQualityScore": 0,
  "resumeLevel": "Junior",
  "unsupportedSkills": [],
  "strongPoints": [],
  "weakPoints": [],
  "achievementIssues": [],
  "missingMetrics": [],
  "weakBullets": [],
  "improvementSuggestions": [],
}`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a strict recruiter. Most resumes should score: contentScore: 60-85. Only exceptional resumes should exceed 90. Return ONLY valid JSON."
        },
        { role: "user", content: feedbackPrompt }
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
      temperature: 0.2,
    });

    let feedback;

try {
  feedback = JSON.parse(
    chatCompletion.choices[0].message.content
  );
} catch (err) {
  console.error(
    "Failed to parse LLM response:",
    chatCompletion.choices[0].message.content
  );

  throw new Error("Invalid JSON returned by model");
}

    let rewrittenBullets = [];

if (
  feedback.weakBullets &&
  feedback.weakBullets.length
) {

  const rewritePrompt = `
Rewrite these resume bullets.

Requirements:

- Strong action verbs
- Quantified outcomes
- ATS friendly

Bullets:

${feedback.weakBullets.join('\n')}

Respond ONLY with valid JSON.

JSON format:

{
  "rewrites": [
    {
      "original": "",
      "improved": "",
      "reason": ""
    }
  ]
}
`;

  const rewriteResponse =
    await groq.chat.completions.create({
      model:
        "llama-3.3-70b-versatile",

      messages: [
        {
          role: "user",
          content: rewritePrompt
        }
      ],

      response_format: {
        type: "json_object"
      }
    });

  rewrittenBullets =
    JSON.parse(
      rewriteResponse
      .choices[0]
      .message.content
    ).rewrites || [];
}
    const achievementScore =
  feedback.achievementScore ?? 70;

const projectQualityScore =
  feedback.projectQualityScore ?? 70;

const resumeLevel =
  feedback.resumeLevel ?? "Junior";

const unsupportedSkills =
  feedback.unsupportedSkills ?? [];
    const contentScore =
  Math.max(
    0,
    Math.min(
      100,
      feedback.contentScore ?? 70
    )
  );

  const unsupportedSkillPenalty =
  Math.min(
    10,
    unsupportedSkills.length * 2
  );
const contentPenalty =
  Math.round(
    ((100 - contentScore) / 100) * 25
  ) +
  unsupportedSkillPenalty;
    console.log('LLM content score:',feedback.contentScore);

    // STEP 4: Final score = structural deductions + bounded LLM quality penalty
    const { score, deductions } =
  calculateScore(
    facts,
    contentPenalty
  );

  const overallScore = Math.round(
  (score * 0.25) +
  (contentScore * 0.30) +
  (achievementScore * 0.25) +
  (projectQualityScore * 0.15) +
  (grammarScore * 0.05)
);

    res.status(200).json({
      analysis: {
  overallScore,

  atsScore: score,

  contentScore,

  grammarScore,
  achievementScore,
  projectQualityScore,
  resumeLevel,
  unsupportedSkills,
  rewrittenBullets,
  grammarCorrections,

  deductions,

  strongPoints:
    feedback.strongPoints || [],

  weakPoints:
    feedback.weakPoints || [],

  achievementIssues:
    feedback.achievementIssues || [],

  missingMetrics:
    feedback.missingMetrics || [],

  weakBullets:
    feedback.weakBullets || [],

  improvementSuggestions:
    feedback.improvementSuggestions || [],

  metrics: {
    quantifiedAchievements:
      facts.quantifiedAchievementsCount,

    quantRatio:
      Math.round(
        facts.quantRatio * 100
      ),

    weakVerbRatio:
      Math.round(
        facts.weakVerbRatio * 100
      ),

    strongActionRatio:
      Math.round(
        facts.strongActionRatio * 100
      ),

    buzzwordCount:
      facts.buzzwordCount
  }
}
    });

  } catch (error) {
    console.error('Resume Analysis Error:', error);
    res.status(500).json({ message: 'Failed to analyze resume', error: error.message });
  }
};

export default { analyzeResume };