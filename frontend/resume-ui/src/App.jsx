import { useState,useEffect } from "react";
import FileUpload from "./components/FileUpload";
import ResultDisplay from "./components/ResultDisplay";

function App() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // 🔁 Load saved result when the app loads
useEffect(() => {
  const saved = localStorage.getItem("resumeResult");
  if (saved) {
    try {
      setResult(JSON.parse(saved));
    } catch {
      localStorage.removeItem("resumeResult");
    }
  }
}, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        📄 AI Resume Analyzer
      </h1>

      <FileUpload onResult={(res) => {
        if (res.error) {
          setError(res.error);
          setResult(null);
           localStorage.removeItem("resumeResult");
        } else {
          setResult(res);
          setError(null);
          localStorage.setItem("resumeResult", JSON.stringify(res));
        }
      }} />

      {error && (
        <div className="text-red-600 mt-4 text-center font-semibold">
          ❌ {error}
        </div>
      )}

      <ResultDisplay result={result} />
    </div>
  );
}

export default App;
