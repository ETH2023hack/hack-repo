import React, { useState, ChangeEvent } from "react";

const FileUploadComponent: React.FC = () => {
  const [fileName, setFileName] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleFileNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.value);
  };

  const handleSubmit = () => {
    // Perform action with selectedFile and fileName
    console.log("File Name:", fileName);
    console.log("Selected File:", selectedFile);
    // Further processing logic here (e.g., API calls, file handling, etc.)
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <input
        type="text"
        placeholder="Enter file name"
        value={fileName}
        onChange={handleFileNameChange}
        className="border border-gray-300 rounded-md px-3 py-2"
      />
      <input
        type="file"
        onChange={handleFileChange}
        className="border border-gray-300 rounded-md px-3 py-2"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Submit
      </button>
    </div>
  );
};

export default FileUploadComponent;
