import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import Summary from "./summary";

function App() {
  const [file, setFile] = useState(null);
  const [htmlContent, setHtmlContent] = useState("");
  
  const [isSuccess, setisSuccess] = useState(false);
  const [formTitle, setFormTitle] = useState({
    heading: "",
    fileDoc: "",
  });
  const [summaryData, setSummaryData] = useState({
    heading: "",
    fileDoc: "",
    mainID:""
  });

  // const InputHandler = (e) => {
  //   if (e.target.name === "fileDoc") {
  //     // setFormTitle({ ...formData, 'fileDoc': e.target.files[0] });
  //     setFile(e.target.files[0]);
  //   } else {
  //     setFormTitle({...formTitle, [`heading`]: e.target.value} );
  //   }
  // };

  // const InputSummaryHandler = (e) => {
  //   if (e.target.name === "fileDoc") {
  //     setSummaryData({ ...summaryData, 'fileDoc': e.target.files[0] });
  //   } else {
  //     setSummaryData({ ...summaryData, [e.target.name]: e.target.value });
  //   }
  // };
// console.log(formData);

  // const handleFileChange = (event) => {
  //   setFile(event.target.files[0]);
  // };
 
  // const handleSubmit = async (event) => {
  //   // console.log(formData);
  //   event.preventDefault();
  //   try {
  //     const formData = new FormData();
  //     formData.append('file', file);
  //     formTitle.fileDoc = formData
  //     const response = await axios.post(
  //       "http://localhost:6000/upload",
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );

  //     console.log(response.data.htmlContent);

  //     setHtmlContent(response.data.htmlContent);
  //     if(response.status===200){
  //       setisSuccess(true)
  //     }
  //   } catch (error) {
  //     console.error("Error uploading file:", error);
  //   }
  // };


  // const handleSubmitSummary = () => {
  //   console.log(summaryData);
    
  // };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('http://localhost:5001/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setHtmlContent(response.data.htmlContent);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  return (
    <div className="" style={{ padding: "40px" }}>
     

{
  isSuccess ?""
//   <form onSubmit={handleSubmitSummary}>
//   <div>
//     <label htmlFor="">Heading : </label>
//     <input
//       type="text"
//       className=""
//       name="heading"
//       onChange={InputSummaryHandler}
//       style={{ padding: "10px", marginTop: "20px" }}
//     />
//   </div>
//   <div>
//     <label htmlFor="">Summary Doc : </label>

//     <input
//       type="file"
//       name="fileDoc"
//       onChange={InputSummaryHandler}
//       style={{ padding: "10px", marginTop: "20px" }}
//     />
//   </div>
//   <button type="submit" style={{ padding: "10px", marginTop: "20px" }}>
//     Upload
//   </button>
// </form>
        :
        <div>
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} />
          <button type="submit">Upload</button>
        </form>
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>

}

      <div style={{ width: "1200px", margin: "auto", paddingTop: "40px" }}>
        {/* <div dangerouslySetInnerHTML={{ __html: htmlContent }} /> */}
        <Summary />
      </div>
    </div>
  );
}

export default App;
