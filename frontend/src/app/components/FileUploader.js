import { useDropzone } from 'react-dropzone';
import { useState } from 'react';
import styles from '../styles/FileUploader.module.css';

const FileUploader = ({ onFileUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]; // Only take the first file
    setSelectedFile(file);
    onFileUpload(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.csv, .xlsx', // Accept only CSV and XLSX files
    multiple: false, // Only allow one file
  });

  // Remove file from the list
  const handleRemoveFile = () => {
    setSelectedFile(null); // Reset selected file
  };

  return (
    <div {...getRootProps()} className={styles.uploader}>
      <input {...getInputProps()} />
      <p>Drag & drop a CSV or XLSX file here, or click to select one</p>

      {/* Display the uploaded file */}
      {selectedFile && (
        <ul className={styles.fileList}>
          <li className={styles.fileItem}>
            {selectedFile.name}
            <button onClick={handleRemoveFile} className={styles.removeButton}>Remove</button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default FileUploader;
