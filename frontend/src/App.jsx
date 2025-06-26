import React from "react";
import Navbar from "./components/NavBar";
import Home from "./pages/home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
      <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
