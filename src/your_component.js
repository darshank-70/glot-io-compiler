import React, { useState } from "react";

const YourComponent = () => {
  const [code, setCode] = useState("");
  const [compiledCode, setCompiledCode] = useState("");
  const [error, setError] = useState(null);
  const [stdErr, setStdErr] = useState(null);

  const compileCode = async () => {
    console.log(code);
    try {
      const response = await fetch("http://localhost:5000/compile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "b0e0ee4f-07b8-4206-a631-112e16b75234", // Replace with your Glot.io API token
        },
        body: JSON.stringify({
          files: [
            {
              name: "main.js",
              content: code,
            },
          ],
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
