import axios from 'axios';

export const analyzeGrammar = async (text) => {
  try {

    const response =
      await axios.post(
        'https://api.languagetool.org/v2/check',

        new URLSearchParams({
          text,
          language: 'en-US'
        }),

        {
          headers: {
            'Content-Type':
              'application/x-www-form-urlencoded'
          }
        }
      );

    const matches =
      response.data.matches || [];

    return {
      totalIssues: matches.length,

      issues: matches.map(issue => ({
        message: issue.message,

        offset: issue.offset,

        length: issue.length,

        replacement:
          issue.replacements?.[0]?.value || null,

        rule:
          issue.rule?.id || null
      }))
    };

  } catch (error) {

    console.error(
      'LanguageTool API Error:',
      error.message
    );

    return {
      totalIssues: 0,
      issues: []
    };
  }
};