import React, { useState } from 'react';
import axios from 'axios';
import { FiUploadCloud, FiCheckCircle, FiAlertCircle, FiTrendingUp } from 'react-icons/fi';
import styles from '../styles/ResumeAnalyzer.module.css';

const ResumeAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first.');
      return;
    }
    setLoading(true); setError(''); setResult(null);
    
    const formData = new FormData();
    formData.append('resume', file);

        try {
      
      const response = await axios.post('http://localhost:5000/api/resume/analyze', formData);
      setResult(response.data.analysis);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while analyzing the resume.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.resumePage}>
      {/* Background elements from App.css */}
      <div className="bg-canvas"></div>
      
      <div className={styles.resumeContainer}>
        {/* Using your global section-label from App.css */}
        <div className="section-label">Resume Analyzer</div>
        
        {/* Upload Box */}
        <div className={styles.uploadBox}>
          <FiUploadCloud className={styles.uploadIcon} />
          <h3>Upload your Resume</h3>
          <p>Supported formats: .pdf, .docx, .md, .tex</p>
          
          <input type="file" accept=".pdf,.docx,.md,.tex" onChange={handleFileChange} />
          
          {/* Using global register-btn from App.css */}
          <button className="register-btn" onClick={handleUpload} disabled={loading}>
            {loading ? 'Analyzing...' : 'Analyze Resume'}
          </button>
        </div>

        {error && <div className={styles.errorBox}>{error}</div>}

        {/* Results */}
        {result && (
          <div className={styles.resultsContainer}>
            {/* ATS Score */}
            <div className={styles.scoreCard}>
              <h2>ATS Compatibility Score</h2>
              <div 
                className={styles.scoreValue} 
                style={{ color: result.atsScore >= 80 ? 'var(--green)' : result.atsScore >= 60 ? '#f5a623' : '#ff4d4d' }}
              >
                {result.atsScore}/100
              </div>
              <div className={styles.progressBarBg}>
                <div 
                  className={styles.progressBarFill} 
                  style={{ 
                    width: `${result.atsScore}%`,
                    background: result.atsScore >= 80 ? 'var(--green)' : result.atsScore >= 60 ? '#f5a623' : '#ff4d4d'
                  }}
                ></div>
              </div>
            </div>

            <div className={styles.grid2Col}>
              <div className={`${styles.feedbackCard} ${styles.cardGreen}`}>
                <h3><FiCheckCircle /> Strong Points</h3>
                <ul>
                  {result.strongPoints.map((point, i) => <li key={i}>{point}</li>)}
                </ul>
              </div>
              
              <div className={`${styles.feedbackCard} ${styles.cardRed}`}>
                <h3><FiAlertCircle /> Areas to Improve</h3>
                <ul>
                  {result.weakPoints.map((point, i) => <li key={i}>{point}</li>)}
                </ul>
              </div>
            </div>

            <div className={`${styles.feedbackCard} ${styles.cardBlue}`}>
              <h3><FiTrendingUp /> Actionable Suggestions</h3>
              <ul>
                {result.improvementSuggestions.map((sug, i) => <li key={i}>{sug}</li>)}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeAnalyzer;