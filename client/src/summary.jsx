import axios from "axios";
import React, { useEffect, useState } from "react";

const Summary = () => {
    const [allData, setallData] = useState("");
    
useEffect(() => {
    fetchApi()
}, []);


  const fetchApi = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/upload"
      );
console.log(response);

      if(response.status===200){
        setallData(response?.data)
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <>
    <div>
        {
         allData.length>0 &&   allData?.map((item)=>{

                <div dangerouslySetInnerHTML={{ __html: item?.Summary }} />
            })
        }
    </div>
    </>
  )
};

export default Summary;
