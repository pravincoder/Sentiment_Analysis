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
    <div className={`${styles.pageContainer} bg-gray-100 min-h-screen flex flex-col items-center`}>
      {/* Navbar */}
      <Navbar />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`${styles.header} relative overflow-hidden py-20 flex flex-col items-center justify-center bg-lightblue-200 rounded-lg shadow-lg mx-4 mt-8`} 
      >
        <h1 className={`${styles.title} text-5xl font-extrabold text-gray-800`}>
          Welcome to <span className={`${styles.highlight} text-blue-500`}>Reviews Scorer</span>
        </h1>
        <p className={`${styles.tagline} text-lg text-gray-600 mt-4`}>
          <span className={`${styles.animatedText} text-blue-600`}>Effortless</span>,{' '}
          <span className={`${styles.animatedText} text-blue-600`}>AI-Driven</span> Sentiment Reviews Scorer
        </p>

        {/* File Uploader Section within the Header */}
        <motion.section
          className={`${styles.section} p-20 bg-blue-200 rounded-lg shadow-md mt-6 w-full max-w-lg`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
        >
          <h2 className={`${styles.sectionTitle} text-2xl font-semibold`}>Select a CSV or XLSX File to Upload</h2>
          <FileUploader onFileUpload={handleFileUpload} />

          {uploadedFile && (
            <>
              <ul className={styles.fileList}>
                <li className={styles.fileItem}>
                  {uploadedFile.name}
                </li>
              </ul>

              <motion.button
                className={`${styles.generateButton} bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-all duration-300`}
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
      </motion.header>

      {/* Render the Review Component */}
      {resultData && (
        <Review resultData={resultData} /> // Pass the JSON data to Review
      )}
    </div>
  );
}
