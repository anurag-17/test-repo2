import React, { useState } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

const Testing = () => {
  const [file, setFile] = useState(null);
  const [htmlContent, setHtmlContent] = useState("");
  // const [mainID, setmainID] = useState(null);
  const [mainData, setMainData] = useState({
    mainHeading: "",
    file: "",
  });

  const [summaryData, setSummaryData] = useState({
    mainHeading: "",
    file: "",
    mainId: "",
  });

  const axiosInstance = axios.create({
    headers: {
      "Content-Type": "application/json",
    },
    maxContentLength: 50 * 1024 * 1024, // Adjust the limit according to your needs
  });

  const InputHandler = (e) => {
    if (e.target.name === "fileDoc") {
      // setFile(e.target.files[0]);
      setMainData({ ...mainData, [`file`]: e.target.files[0] });
    } else {
      setMainData({ ...mainData, [`mainHeading`]: e.target.value });
    }
  };

  const summaryInputHandler = (e) => {
    if (e.target.name === "fileDoc") {
      // setFile(e.target.files[0]);
      setSummaryData({ ...summaryData, [`file`]: e.target.files[0] });
    } else {
      setSummaryData({ ...summaryData, [`mainHeading`]: e.target.value });
    }
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    try {
      // const formData = new FormData();
      // formData.append("file", file);

      const response = await axios.post(
        "https://test-repo2-lemon.vercel.app/upload",
        mainData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      setSummaryData({ ...summaryData, [`mainId`]: response?.data?.id });
      // setHtmlContent(response?.data?.htmlContent)
      // setMainData({ ...mainData, [`file`]: response?.data?.htmlContent });
      // setSummaryData({ ...summaryData, [`file`]: response?.data?.htmlContent });
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleSummaryUpload = async (event) => {
    event.preventDefault();
    console.log(summaryData)
    try {
      // const formData = new FormData();
      // formData.append("file", file);

      const response = await axios.post(
        "https://test-repo2-lemon.vercel.app/uploadSummary",
        summaryData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const submitMaindata = async (event) => {
    event.preventDefault();
    console.log(mainData);
    try {
      const response = await axios.post(
        "https://test-repo2-lemon.vercel.app/uploadMainBook",
        mainData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          maxContentLength: 50 * 1024 * 1024, // Adjust the limit according to your needs
        }
      );
      // console.log(response)
      // setSummaryData({ ...summaryData, [`mainId`]: response?.data?._id });
      setMainData({
        mainHeading: "",
        file: "",
      });
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const submitSummaryData = async (event) => {
    event.preventDefault();
    // console.log(summaryData)
    try {
      const response = await axiosInstance.post(
        "https://test-repo2-lemon.vercel.app/uploadSummary",
        summaryData
      );
      console.log(response);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <>
      {summaryData?.mainId === "" ? (
        <form onSubmit={handleUpload}>
          <div>
            <label htmlFor="">Heading : </label>
            <input
              type="text"
              className=""
              name="mainHeading"
              onChange={InputHandler}
              value={mainData?.mainHeading}
              style={{ padding: "10px", marginTop: "20px" }}
            />
          </div>

          <div>
            <label htmlFor=""> Doc : </label>

            <input
              type="file"
              name="fileDoc"
              onChange={InputHandler}
              style={{ padding: "10px", marginTop: "20px" }}
            />
            {/* <button
              type="button"
              style={{ padding: "10px", marginTop: "20px" }}
              onClick={handleUpload}
            >
              Upload Doc
            </button> */}
          </div>
          <button type="submit" style={{ padding: "10px", marginTop: "20px" }}>
            Submit
          </button>
        </form>
      ) : (
        <form onSubmit={handleSummaryUpload}>
          <div>
            <label htmlFor="">Summary Heading : </label>
            <input
              type="text"
              className=""
              name="mainHeading"
              onChange={summaryInputHandler}
              style={{ padding: "10px", marginTop: "20px" }}
            />
          </div>

          <div>
            <label htmlFor="">Summary Doc : </label>

            <input
              type="file"
              name="fileDoc"
              onChange={summaryInputHandler}
              style={{ padding: "10px", marginTop: "20px" }}
            />
            {/* <button
              type="button"
              style={{ padding: "10px", marginTop: "20px" }}
              onClick={handleUpload}
            >
              Upload Doc
            </button> */}
          </div>
          <button type="submit" style={{ padding: "10px", marginTop: "20px" }}>
            Submit
          </button>
        </form>
      )}

      <Link to="/summary">summary page</Link>
    </>
  );
};

export default Testing;
