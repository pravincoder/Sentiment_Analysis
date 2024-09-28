'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import FileUploader from './components/FileUploader';
import Navbar from './components/Navbar';
import styles from './styles/page.module.css';
import Review from './components/Review'; // Import the new Review component

export default function MyPage() {
  const [uploadedFile, setUploadedFile] = useState(null); // Only one file
  const [resultData, setResultData] = useState(null); // Store result as JSON
  const [isResultGenerating, setIsResultGenerating] = useState(false);

  // Function to handle file upload (updated to handle only one file)
  const handleFileUpload = (file) => {
    setUploadedFile(file); // Replace the file, not append
  };

  // Function to handle result generation
  const handleGenerateResult = async () => {
    if (!uploadedFile) return alert('Please upload a file first');

    setIsResultGenerating(true); // Set loading state
    const formData = new FormData();
    formData.append('file', uploadedFile); // Send only one file

    try {
      const response = await fetch('http://127.0.0.1:5000/score_reviews', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to generate scores');
      }

      const data = await response.json();
      if (data.error) {
        console.error('Error:', data.error);
      } else {
        setResultData(data); // Store the JSON result
      }
    } catch (error) {
      console.error('Error generating score:', error);
    } finally {
      setIsResultGenerating(false); // Reset loading state
    }
  };

  return (
    <div className={styles.pageContainer}>
      {/* Navbar */}
      <Navbar />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={styles.header}
      >
        <h1 className={styles.title}>
          Welcome to <span className={styles.highlight}>Reviews Scorer</span>
        </h1>
        <p className={styles.tagline}>
          <span className={styles.animatedText}>Effortless</span>,{' '}
          <span className={styles.animatedText}>AI-Driven</span> Sentiment Reviews Scorer
        </p>
      </motion.header>

      {/* File Uploader Section */}
      <motion.section
        className={styles.section}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
      >
        <h2 className={styles.sectionTitle}>Select a csv or xlsx File to Upload</h2>
        <FileUploader onFileUpload={handleFileUpload} />

        {uploadedFile && (
          <>
            <ul className={styles.fileList}>
              <li className={styles.fileItem}>
                {uploadedFile.name}
              </li>
            </ul>

            <motion.button
              className={styles.generateButton}
              onClick={handleGenerateResult}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isResultGenerating}
            >
              {isResultGenerating ? 'Generating Scores...' : 'Generate Reviews Scores'}
            </motion.button>
          </>
        )}
      </motion.section>

      {/* Render the Review Component */}
      {resultData && (
        <Review resultData={resultData} /> // Pass the JSON data to Review
      )}
    </div>
  );
}
