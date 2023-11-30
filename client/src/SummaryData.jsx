import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

const SummaryData = () => {
  const [allData, setallData] = useState([]);
  const params = useParams();
  const targetDivRef = useRef(null);

  useEffect(() => {
    fetchApi();
  }, []);

  useEffect(() => {
    // Scroll to the target div when allData or params.id changes
    if (allData.length > 0 && targetDivRef.current) {
      targetDivRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [allData, params.id]);

  const fetchApi = async () => {
    try {
      const response = await axios.get("https://test-repo2-lemon.vercel.app/allMainData");
console.log(response)
      if (response.status === 200) {
        setallData(response?.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      {allData.map((items, index) => (
        <div key={items?._id} ref={params.id === items?._id ? targetDivRef : null}>
          {console.log(items)}
          <div dangerouslySetInnerHTML={{ __html: items?.file?.htmlContent }} />
        </div>
      ))}
    </>
  );
};

export default SummaryData;
