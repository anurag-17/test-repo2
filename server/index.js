const express = require("express");
const multer = require("multer");
// const pdf2html = require('pdf2htmlEX-continuous');
const mammoth = require("mammoth");
const fs = require("fs").promises;
const app = express();
const { promisify } = require("util");
const readFile = promisify(fs.readFile);
var cors = require("cors");

const { exec } = require("child_process");

app.use(cors());

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

// Route for handling file uploads
// app.post('/upload', upload.single('file'), async (req, res) => {
//   try {
//     const filePath = req.file.path;
//     const fileType = req.file.mimetype;

//     let htmlContent = '';

//     if (fileType === 'application/pdf') {
//     //   const pdfContent = await readFile(filePath);
//     //   htmlContent = await pdf2html(pdfContent);
//     } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
//       const docxContent = await readFile(filePath);
//       const result = await mammoth.convertToHtml({ arrayBuffer: docxContent });
//       htmlContent = result.value;
//     }

//     // Save htmlContent to your database

//     res.status(200).json({ htmlContent });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Error processing file' });
//   }
// });

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const filePath = req.file.path;
    const fileType = req.file.mimetype;
    let htmlContent = "";


    if (fileType === "application/pdf") {
      // Convert PDF to HTML using pdf2htmlEX as before
    } else if (
      fileType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      fileType === "application/msword"
      ) {
        const docxContent = await fs.readFile(filePath);
        const options = { buffer: docxContent };
        
      mammoth
        .convertToHtml(options)
        .then((result) => {
          console.log(result );
          
          htmlContent = result.value;
          // Save htmlContent to your database or send it as a response
          res.status(200).json({ htmlContent });
        })
        .catch((error) => {
          console.error("Mammoth conversion error:", error);
          res.status(500).json({ error: "Error converting file to HTML" });
        });
    } else {
      res.status(400).json({ error: "Unsupported file type" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error processing file" });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
