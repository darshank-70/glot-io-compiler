import React, { useState } from "react";
import GLOT_API_KEY from "./API.js";
const YourComponent = () => {
  const [code, setCode] = useState("");
  const [compiledCode, setCompiledCode] = useState("");
  const [error, setError] = useState(null);
  const [stdErr, setStdErr] = useState(null);
  const [currentLangName, setCurrentLangName] = useState("javascript");
  const [filename, setFilename] = useState("main.js");
  const fileExt = {
    javascript: "main.js",
    java: "main.java",
    python: "main.py",
    c: "main.c",
  };
  function handleLangSelect(e) {
    console.log(e.target.value);
    setCurrentLangName(e.target.value);
    setFilename(fileExt[e.target.value]);
  }
  const compileCode = async () => {
    console.log(code);
    console.log(currentLangName);
    console.log(`file name is set to ${filename}`);
    try {
      const response = await fetch("http://localhost:5000/compile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: GLOT_API_KEY,
        },
        body: JSON.stringify({
          files: [
            {
              name: filename,
              content: code,
            },
          ],
          language: currentLangName,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setCompiledCode(data.stdout);
        setError(data.error);

        console.log("OUTPUTTTTTTTT:", data);
        setStdErr(data.stderr);
      } else {
        setError(data.stderr);
        setStdErr(data.stderr);
      }
    } catch (error) {
      setError("An error occurred while compiling the code.");
    }
  };

  return (
    <div>
      <div className="language-select">
        <select onChange={handleLangSelect} value={currentLangName}>
          <option value={"javascript"}>javascript</option>
          <option value={"python"}>python</option>
          <option value={"java"}>Java</option>
          <option value={"c"}>C</option>
        </select>
      </div>
      <div className="current-language">
        <h4>current language: {currentLangName}</h4>
      </div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows={10}
        cols={50}
      />
      <button onClick={compileCode}>Compile</button>
      {compiledCode && <pre>{compiledCode}</pre>}
      {error && <div>{error}</div>}
      {error && `${error} ${stdErr}`}
    </div>
  );
};

export default YourComponent;
