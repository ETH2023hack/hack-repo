import React, { useState, ChangeEvent } from "react";
import lighthouse from '@lighthouse-web3/sdk';

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

  const progressCallback = (progressData: { total: number, uploaded: number }) => {
    let percentageDone =
  100 - parseFloat((progressData?.total / progressData?.uploaded)?.toFixed(2) || '0');
    console.log(percentageDone)
  }

  const handleSubmit = async () => {
    // Perform action with selectedFile and fileName
    console.log("File Name:", fileName);
    console.log("Selected File:", selectedFile);
    console.log(selectedFile);

    const output = await lighthouse.upload(selectedFile, "307047f7.4798cd5840b04a5ab322cb2ebc6a6b98", false, undefined, progressCallback)
    console.log('File Status:', output)
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 min-h-screen">
      <h1 className="text-3xl font-semibold text-secondary">Upload File</h1>
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
