import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Summary from "./Summary";
import SummaryData from "./SummaryData";
import Testing from "./testing";

function App() {
  return (
    <div  style={{ width: "1200px", margin: "auto", padding: "40px" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Testing />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/summaryData/:id" element={<SummaryData />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
