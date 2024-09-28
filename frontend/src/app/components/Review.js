'use client';
import { motion } from 'framer-motion';
import styles from '../styles/review.module.css'; // Ensure this path is correct

export default function Review({ resultData }) {
  // Parse the result string from JSON, handling escape characters
  const parsedResult = JSON.parse(resultData.result.replace(/\\n/g, '\n'));

  return (
    <motion.section
      className={styles.reviewSection}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <h2 className={styles.reviewTitle}>Generated Reviews Scores</h2>
      
      {/* Render the parsed JSON data as string */}
      <pre className={styles.reviewOutput}>
        {JSON.stringify(parsedResult, null, 2)} {/* Format JSON nicely */}
      </pre>
    </motion.section>
  );
}
