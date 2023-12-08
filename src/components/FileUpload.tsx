import React, { useState, ChangeEvent } from "react";
import lighthouse from '@lighthouse-web3/sdk';

const FileUploadComponent: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const options = [
    { key: 1, value: "10th class" },
    { key: 2, value: "12th class" },
    { key: 3, value: "Aadhar card" },
    { key: 4, value: "Driving license" },
    { key: 5, value: "B.Tech Degree" },
  ];

  const handleOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
    }
  };

  const handleSubmit = async () => {
    // Perform action with selectedOption, selectedFile
    console.log("Selected Option:", selectedOption);
    console.log("Selected File:", selectedFile);
    console.log(selectedFile);

    const output = await lighthouse.upload(selectedFile, "307047f7.4798cd5840b04a5ab322cb2ebc6a6b98", false, undefined);
    console.log('File Status:', output)
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <select
        value={selectedOption}
        onChange={handleOptionChange}
        className="border border-gray-300 rounded-md px-3 py-2"
      >
        <option value="">Select an option</option>
        {options.map((item) => (
          <option key={item.key} value={item.key}>
            {item.value}
          </option>
        ))}
      </select>
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
