// index.js
const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const fs = require('fs');
const cors = require('cors');
const analyzeResume = require('./gemini');
require('dotenv').config();

const app = express();
const port = 5000;

// Store uploaded PDFs in /uploads temporarily
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());

app.post('/upload', upload.single('resume'), async (req, res) => {
  try {
    const dataBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(dataBuffer);
    const text = pdfData.text;

    const aiFeedback = await analyzeResume(text);

    res.json({
      message: 'Resume processed successfully.',
      preview: text.slice(0, 300),
      aiFeedback,
    });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ error: 'Failed to process resume' });
  }
});

app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
