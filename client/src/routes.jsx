import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Summary from "./Summary";
import Testing from "./testing";


function NotFoundPage() {
  return <div className="page">Not Found Page</div>;
}


export default function Navbar() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Testing/>} />
        <Route path="/summary" element={ <Summary/>} />
        {/* <Route path="/admin" element={<Admin />} />
        <Route path="/admin-login" element={<Admin_Login />} /> */}
        <Route path="/404" element={<NotFoundPage />} />
       
        <Route path="/">
          <Route path="*" element={<Navigate replace to="/" />} />
        </Route>
        <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
    </BrowserRouter>
  );
}
