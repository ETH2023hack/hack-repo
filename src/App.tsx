import ContractRead from "./components/ContractRead";
import ContractWrite from "./components/ContractWrite";
import FileUpload from "./components/FileUpload";

function App() {
  return (
    <div className="flex flex-col items-center justify-evenly font-NotoSans min-h-screen py-16">
      <h1 className="text-secondary text-9xl font-bold mb-10">veri-fy</h1>

      <FileUpload />

      {/* <ContractRead /> */}
      {/* <ContractWrite /> */}
    </div>
  );
}

export default App;
