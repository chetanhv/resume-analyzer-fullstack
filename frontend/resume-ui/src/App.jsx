import { useEffect, useState } from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "./firebase";

import FileUpload from "./components/FileUpload";
import ResultDisplay from "./components/ResultDisplay";

function App() {
  const [user, setUser] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Load saved resume result on first render
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

  // Google login
  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((res) => setUser(res.user))
      .catch((err) => alert("Login failed",err));
  };

  // Logout and reset everything
  const handleLogout = () => {
    signOut(auth);
    setUser(null);
    setResult(null);
    localStorage.removeItem("resumeResult");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        📄 AI Resume Analyzer
      </h1>

      {!user ? (
        <div className="text-center">
          <button
            onClick={handleLogin}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            🔐 Sign in with Google
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-700">
              👋 Welcome, <strong>{user.displayName}</strong>
            </p>
            <button
              onClick={handleLogout}
              className="text-sm text-red-500 underline"
            >
              Logout
            </button>
          </div>

          <FileUpload
            onResult={(res) => {
              if (res.error) {
                setError(res.error);
                setResult(null);
                localStorage.removeItem("resumeResult");
              } else {
                setResult(res);
                setError(null);
                localStorage.setItem("resumeResult", JSON.stringify(res));
              }
            }}
          />

          {error && (
            <div className="text-red-600 mt-4 text-center font-semibold">
              ❌ {error}
            </div>
          )}

          <ResultDisplay result={result} />

          {result && (
            <div className="text-center mt-4">
              <button
                onClick={() => {
                  setResult(null);
                  localStorage.removeItem("resumeResult");
                }}
                className="text-sm text-gray-500 hover:underline"
              >
                ❌ Clear Resume Analysis
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
