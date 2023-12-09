import React, { useState, ChangeEvent } from "react";
import lighthouse from '@lighthouse-web3/sdk';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { contractABI, contractAddress } from "../utils/contractInfo";

const FileUploadComponent: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<number>(1);
  const [fileHash, setFileHash] = useState<string>("");
  const [sendToAddr, setSendToAddr] = useState<string>("0x");
  const [selectedFile, setSelectedFile] = useState<FileList | null>(null);

  const options = [
    { key: "10th class", value: 1 },
    { key: "12th class", value: 2 },
    { key: "Aadhar card", value: 3 },
    { key: "Driving license", value: 4 },
    { key: "University Degree", value:5 },
  ];

  const handleOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(parseInt(e.target.value));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files);
    }
  };

   // send to contract
   const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: contractABI,
    functionName: "addDocument",
    args: [sendToAddr as `0x${string}`,BigInt(selectedOption),fileHash],
  });

  const { write, data } = useContractWrite(config);

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
  });

  const handleSubmit = async () => {
    const output = await lighthouse.upload(selectedFile, "307047f7.4798cd5840b04a5ab322cb2ebc6a6b98", false, undefined);
    console.log('File Status:', output.data.Hash);
    setFileHash(output.data.Hash);
    write?.();
  };

  return (
    <div className="flex flex-col justify-center space-y-4 min-h-screen">
      <h1 className="text-2xl text-secondary font-semibold">Upload and issue File</h1>
      <input type="text" name="sendToAddr" id="sendTAddr" placeholder="Issue To Address" className="border border-gray-300 rounded-md px-3 py-2" onChange={(e)=>setSendToAddr(e.target.value)} />
      <select
        value={selectedOption}
        onChange={handleOptionChange}
        className="border border-gray-300 rounded-md px-3 py-2"
      >
        <option value="">Select type</option>
        {options.map((item) => (
          <option key={item.value} value={item.value}>
            {item.key}
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
