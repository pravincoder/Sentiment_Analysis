import { motion } from 'framer-motion';

export default function Review({ resultData }) {
  let parsedResult;

  try {
    // Check if resultData.result is a valid JSON string
    if (typeof resultData.result === 'string') {
      parsedResult = JSON.parse(resultData.result.replace(/\\n/g, '\n'));
    } else {
      // If it's already an object, just assign it directly
      parsedResult = resultData.result;
    }
  } catch (error) {
    console.error('Error parsing resultData:', error);
    return <div>Error parsing results. Please check the data.</div>;
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-md mt-8"
    >
      <h2 className="text-2xl font-semibold">Review Scores</h2>
      <pre className="mt-4 whitespace-pre-wrap">{JSON.stringify(parsedResult, null, 2)}</pre>
    </motion.section>
  );
}
