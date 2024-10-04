import { useDropzone } from 'react-dropzone';
import { useState } from 'react';

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
    <div 
      {...getRootProps()} 
      className="border-2 border-dashed border-gray-300 p-6 rounded-lg cursor-pointer text-center transition hover:border-gray-600"
    >
      <input {...getInputProps()} />
      <p className="text-gray-500">Drag & drop a CSV or XLSX file here, or click to select one</p>

      {/* Display the uploaded file */}
      {selectedFile && (
        <ul className="list-none mt-4">
          <li className="bg-gray-50 p-4 rounded-lg shadow-md flex justify-between items-center">
            {selectedFile.name}
            <button 
              onClick={handleRemoveFile} 
              className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition"
            >
              Remove
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default FileUploader;
