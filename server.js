import express, { json } from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

app.use(json());

app.post("/compile", async (req, res) => {
  try {
    console.log(req);
    const response = await fetch("https://glot.io/api/run/javascript/latest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token b0e0ee4f-07b8-4206-a631-112e16b75234", // Replace with your Glot.io API token
      },
      body: JSON.stringify({
        files: [
          {
            name: "main.js",
            content: req.body.files[0].content,
          },
        ],
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
