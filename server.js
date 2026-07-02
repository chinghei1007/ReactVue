import express from "express";
import { execFile } from "child_process";

const app = express();
const PORT = 5000;

app.get("/api/playlist", (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: "Missing playlist URL" });

  execFile("yt-dlp", ["-J", url], (err, stdout, stderr) => {
    if (err) {
      console.error("yt-dlp error:", stderr);
      return res.status(500).json({ error: "yt-dlp failed" });
    }
    try {
      const data = JSON.parse(stdout);
      res.json(data);
    } catch (parseErr) {
      res.status(500).json({ error: "Failed to parse yt-dlp output" });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
