import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { contractABI, contractAddress } from "../utils/contractInfo";

export default function ViewAllDocs() {
    const {address} = useAccount();

    const { config } = usePrepareContractWrite({
      address: contractAddress,
      abi: contractABI,
      functionName: "getAllDocumentHashes",
      args: [address ? address as `0x${string}`:'0x'],
    });

  const { write, data } = useContractWrite(config);

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSettled(data, _) {
      const response = data ? data.logs[0].data : []
      console.log("Settled", response)
  }
  });

  const getAllDocs = ()=>{
        write?.();
  }
  console.log(data);
  
  return (
    <div className="flex flex-col justify-center space-y-4 min-h-screen">
      <h1 className="text-2xl text-secondary font-semibold">View All Docs</h1>
      <button
        className="tex-2xl px-2 py-1 font-semibold bg-secondary text-primary rounded-md cursor-pointer disabled:cursor-not-allowed"
        onClick={getAllDocs}
        >
            Sign to get all docs
      </button>
      {isLoading && <h1 className="text-secondary">Loading...</h1>}

    </div>
  )
}
