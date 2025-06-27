import React from "react";
import Navbar from "./components/NavBar";
import Signup from "./pages/Signup";
import Home from "./pages/home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Signin from "./pages/Signin";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
      <>
      <Navbar />
      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path = "/signup" element = {<Signup />} />
        <Route path = "/login" element = {<Signin />} />
        <Route path = "/dashboard" element = { <PrivateRoute>  <Dashboard /> </PrivateRoute>} />
      </Routes>
    </>
  );
};

export default App;
