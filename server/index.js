const express = require("express");
const multer = require("multer");
// const pdf2html = require('pdf2htmlEX-continuous');
const mammoth = require("mammoth");
const fs = require("fs").promises;
const app = express();
const { promisify } = require("util");
const readFile = promisify(fs.readFile);
var cors = require("cors");
require("dotenv").config({ path: "../.env" });
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const Test = require("./models/test");

const { exec } = require("child_process");

const corsOptions = {
  origin: [
  "http://localhost:3000", 
  "*"
],
  credentials: true, 
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(cookieParser('secret'));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));



// Connect Database
connectDB();

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
    // console.log(req.file);
    const { mainHeading } = req.body;
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
          console.log(result);

          htmlContent = result.value;

          //saving html content and heading in DB
          const newTest = new Test({
            mainHeading,
            file: { htmlContent },
          });

          newTest
            .save()
            .then(() => {
              res.status(200).json({ htmlContent, mainHeading });
            })
            .catch((error) => {
              console.error("Error saving Test document:", error);
              res.status(500).json({ error: "Error saving Test document" });
            });
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

// GET all test data
app.get("/testData", async (req, res) => {
  try {
    const testData = await Test.find();

    res.status(200).json(testData);
  } catch (error) {
    console.error("Error retrieving test data:", error);
    res.status(500).json({ error: "Error retrieving test data" });
  }
});

// GET single test data by ID
app.get("/testData/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const testData = await Test.findById(id);

    if (!testData) {
      return res.status(404).json({ error: "Test data not found" });
    }

    res.status(200).json(testData);
  } catch (error) {
    console.error("Error retrieving test data:", error);
    res.status(500).json({ error: "Error retrieving test data" });
  }
});

if (process.env.NODE_ENV === "dev") {
  //replaced "production" with "dev"
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}


const PORT = 5001;

const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);