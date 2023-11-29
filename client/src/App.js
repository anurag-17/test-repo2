import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [htmlContent, setHtmlContent] = useState("");
  const [formData, setFormData] = useState({
    heading: "",
    subHeading: "",
    fileDoc: "",
  });

  const InputHandler = (e) => {
    if (e.target.name === "fileDoc") {
      setFormData({ ...formData, 'fileDoc': e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
console.log(formData);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "http://localhost:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data.htmlContent);

      setHtmlContent(response.data.htmlContent);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="" style={{ padding: "40px" }}>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Heading : </label>
          <input
            type="text"
            className=""
            name="heading"
            onChange={InputHandler}
            style={{ padding: "10px", marginTop: "20px" }}
          />
        </div>

        <div>
          <label htmlFor=""> SubHeading : </label>
          <input
            type="text"
            className=""
            name="fileDoc"
            onChange={InputHandler}
            style={{ padding: "10px", marginTop: "20px" }}
          />
        </div>
        <div>
          <label htmlFor=""> Doc : </label>

          <input
            type="file"
            name="subHeading"
            onChange={InputHandler}
            style={{ padding: "10px", marginTop: "20px" }}
          />
        </div>
        <button type="submit" style={{ padding: "10px", marginTop: "20px" }}>
          Upload
        </button>
      </form>

      <div style={{ width: "1200px", margin: "auto", paddingTop: "40px" }}>
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    </div>
  );
}

export default App;
