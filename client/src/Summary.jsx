import axios from "axios";
import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";

const Summary = () => {
  const [allData, setallData] = useState([]);
  
  useEffect(() => {
    fetchApi();
  }, []);

  const fetchApi = async () => {
    try {
      const response = await axios.get("http://localhost:5001/allSummaryData");

      if (response.status === 200) {
        setallData(response?.data);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
console.log(allData)
  return (
    <>
      <div style={{ width: "1200px", margin: "auto", padding: "40px" }}>
      {
        allData.map((items,inx)=>{
          return(
          <>
          <div className="" style={{ padding: "20px", borderBottom:"1px solid " }}>
          <h2 className="">{inx + 1 }. {items?.mainHeading}</h2>
            <div dangerouslySetInnerHTML={{ __html: items?.file?.htmlContent }} />
            <Link  to={`/summaryData/${items?.mainId}`} target="_blank"> Read more </Link>
          </div>
          </>
          )
        })
      }
      </div>
    </>
  );
};

export default Summary;
