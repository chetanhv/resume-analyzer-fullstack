// src/components/FileUpload.jsx
import { useState } from "react";
import axios from "axios";

const FileUpload = ({ onResult }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!file) return alert("Please upload a file.");

  const formData = new FormData();
  formData.append("resume", file);

  try {
    setLoading(true);
    const res = await axios.post("http://localhost:5000/upload", formData);
    onResult(res.data);
  } catch (err) {
    console.error("Upload error:", err);
    onResult({ error: "Upload failed. Please try again." });
  } finally {
    setLoading(false);
  }
};


  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
        className="block w-full border border-gray-300 p-2 rounded"
      />
    <button
  type="submit"
  disabled={loading}
  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
>
  {loading ? (
    <>
      <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8z"
        ></path>
      </svg>
      Processing...
    </>
  ) : (
    "Analyze Resume"
  )}
</button>

    </form>
  );
};

export default FileUpload;
