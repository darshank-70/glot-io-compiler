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
    console.log("-------------------");

    console.log(req.headers.contenttype);
    console.log(req.body.language);

    console.log(req.headers.authorization);

    console.log("inputs: ", req.body.stdin);

    const currentLanguage = req.body.language;
    const response = await fetch(
      `https://glot.io/api/run/${currentLanguage}/latest`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `TOKEN ${req.headers.authorization}`,
        },
        body: JSON.stringify({
          files: [
            {
              name: req.body.files[0].name,
              content: req.body.files[0].content,
            },
          ],
          stdin: req.body.stdin,
        }),
      }
    );

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
