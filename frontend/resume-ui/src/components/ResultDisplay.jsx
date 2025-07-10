import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import ReactMarkdown from "react-markdown";

const ResultDisplay = ({ result }) => {
  if (!result) return null;

  // Extract ATS Score (if present)
  const atsScoreMatch = result.aiFeedback.match(/ATS.*?(\d{1,3})\/100/i);
  const atsScore = atsScoreMatch ? parseInt(atsScoreMatch[1]) : null;

    const downloadFeedback = () => {
    const blob = new Blob([result.aiFeedback], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "gemini_resume_feedback.txt";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-6 space-y-4">
      <Disclosure defaultOpen>
        {({ open }) => (
          <>
            <DisclosureButton className="w-full flex justify-between items-center bg-gray-200 px-4 py-2 rounded font-semibold">
              📄 Resume Preview
              <span>{open ? "−" : "+"}</span>
            </DisclosureButton>
            <DisclosurePanel className="bg-gray-50 p-4 text-sm whitespace-pre-wrap rounded">
              {result.preview}
            </DisclosurePanel>
          </>
        )}
      </Disclosure>

      <Disclosure defaultOpen>
        {({ open }) => (
          <>
            <DisclosureButton className="w-full flex justify-between items-center bg-yellow-200 px-4 py-2 rounded font-semibold">
              🤖 Gemini AI Feedback
              <span>{open ? "−" : "+"}</span>
            </DisclosureButton>
            <DisclosurePanel className="bg-yellow-50 p-4 rounded text-sm">
              <ReactMarkdown>{result.aiFeedback}</ReactMarkdown>
                 <div className="text-right mt-4">
                <button
                  onClick={downloadFeedback}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
                >
                  📥 Download Feedback
                </button>
              </div>
            </DisclosurePanel>
          </>
        )}
      </Disclosure>

      {atsScore !== null && (
        <div
          className={`text-center p-4 rounded font-semibold ${
            atsScore >= 70
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          📈 ATS Score: {atsScore}/100
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;
