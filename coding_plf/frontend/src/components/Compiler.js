import React, { useState } from 'react';

const CodeEditor = ({ languages, initialLanguage = "python3", onRun }) => {
  const [language, setLanguage] = useState(initialLanguage);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleRunCode = () => {
    const result = onRun(code, language);
    setOutput(result);
  };

  return (
    <section id="editor" className="bg-gray-900 text-white p-16">
      <h1 className="text-3xl font-bold mb-8">Programiz Online Compiler</h1>
      <div className="p-6 bg-gray-800 rounded-lg shadow-lg transform transition-transform duration-300 hover:shadow-[0_0_30px_5px_rgba(255,0,0,0.5),0_0_30px_5px_rgba(0,255,0,0.5),0_0_30px_5px_rgba(0,0,255,0.5)] hover:scale-105">
        <div className="md:flex md:w-full">
          <div className="md:w-2/3 p-4 bg-gray-700 rounded-lg">
            <select value={language} onChange={handleLanguageChange} className="mb-4 p-2 bg-gray-600 text-white rounded">
              {languages.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
            <textarea
              value={code}
              onChange={handleCodeChange}
              rows="10"
              cols="50"
              className="w-full p-4 bg-gray-600 text-white rounded"
              placeholder="Write your code here..."
            ></textarea>
            <button
              onClick={handleRunCode}
              className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition duration-300 ease-in-out"
            >
              Run
            </button>
          </div>
          <div className="md:w-1/3 md:ml-4 p-4 bg-gray-700 rounded-lg">
            <p className="text-lg font-semibold">Output:</p>
            <pre className="whitespace-pre-wrap">{output}</pre>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodeEditor;
