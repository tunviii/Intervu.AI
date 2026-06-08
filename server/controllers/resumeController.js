import fs from 'fs';
import mammoth from 'mammoth';
import Groq from 'groq-sdk';
import dotenv from 'dotenv';
import { createRequire } from 'module';

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

// ─── DETERMINISTIC SCORER ─────────────────────────────────────────────────────
// The LLM extracts facts. Your code calculates the score. No inflation possible.
const calculateScore = (facts) => {
  let score = 100;
  const deductions = [];

  // SECTION COMPLETENESS (max -40)
  if (!facts.hasContactInfo)   { score -= 10; deductions.push('Missing contact info (-10)'); }
  if (!facts.hasSummary)       { score -= 5;  deductions.push('Missing summary/objective (-5)'); }
  if (!facts.hasWorkExperience){ score -= 15; deductions.push('Missing work experience (-15)'); }
  if (!facts.hasEducation)     { score -= 10; deductions.push('Missing education section (-10)'); }

  // KEYWORD & SKILLS DENSITY (max -25)
  if (!facts.hasSkillsSection)               { score -= 10; deductions.push('No skills section (-10)'); }
  if (facts.quantifiedAchievementsCount < 5) { score -= 10; deductions.push(`Only ${facts.quantifiedAchievementsCount} quantified achievements (-10)`); }
  if (!facts.hasIndustryKeywords)            { score -= 5;  deductions.push('Generic language, no industry keywords (-5)'); }

  // ATS FORMATTING (max -20)
  if (!facts.hasClearSectionHeaders)   { score -= 10; deductions.push('No clear section headers (-10)'); }
  if (facts.hasComplexFormatting)      { score -= 5;  deductions.push('Complex formatting hurts ATS parsing (-5)'); }
  if (facts.hasInconsistentDates)      { score -= 5;  deductions.push('Inconsistent date formats (-5)'); }

  // IMPACT & QUALITY (max -15)
  if (facts.jobDutiesInsteadOfImpact)  { score -= 8;  deductions.push('Lists duties instead of achievements (-8)'); }
  if (facts.quantifiedAchievementsCount === 0) { score -= 7; deductions.push('Zero quantified results (-7)'); }

  return { score: Math.max(0, score), deductions };
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

    // PASS 1: Ask the LLM ONLY to extract facts — not to score
    const extractionPrompt = `
You are a resume parser. Your ONLY job is to extract factual observations from the resume text below.
Do NOT be encouraging. Do NOT give advice. Just report what you literally see.

Answer each question truthfully with true/false or a number:

Resume Text:
"""
${text.substring(0, 8000)}
"""

Respond ONLY in this exact JSON format:
{
  "hasContactInfo": boolean (true if email AND phone are present),
  "hasSummary": boolean (true if there is a summary, objective, or profile section),
  "hasWorkExperience": boolean (true if there is a work experience or employment section),
  "hasEducation": boolean (true if there is an education section),
  "hasSkillsSection": boolean (true if there is a dedicated skills or technologies section),
  "hasIndustryKeywords": boolean (true if there are technical or industry-specific terms),
  "hasClearSectionHeaders": boolean (true if sections like Experience, Education, Skills are clearly labeled),
  "hasComplexFormatting": boolean (true if the text appears to use tables or multiple columns),
  "hasInconsistentDates": boolean (true if date formats are mixed e.g. Jan 2023 vs 01/2023),
  "jobDutiesInsteadOfImpact": boolean (true if bullet points mostly describe duties rather than accomplishments),
  "quantifiedAchievementsCount": number (count of bullet points that contain a number, %, or metric),
  "strongPoints": ["3 to 5 genuine factual strengths observed in the resume"],
  "weakPoints": ["3 to 5 genuine factual weaknesses or missing elements"],
  "improvementSuggestions": ["3 to 5 highly specific, actionable suggestions"]
}
`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: extractionPrompt }],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
    });

    const facts = JSON.parse(chatCompletion.choices[0].message.content);

    // PASS 2: Calculate the score in YOUR code — not the LLM's
    const { score, deductions } = calculateScore(facts);

    res.status(200).json({
      analysis: {
        atsScore: score,
        deductions,                          
        strongPoints: facts.strongPoints,
        weakPoints: facts.weakPoints,
        improvementSuggestions: facts.improvementSuggestions,
      }
    });

  } catch (error) {
    console.error('Resume Analysis Error:', error);
    res.status(500).json({ message: 'Failed to analyze resume', error: error.message });
  }
};

export default { analyzeResume };