import React from "react";
import Navbar from "./components/NavBar";
import Signup from "./pages/Signup";
import Home from "./pages/home";
import About from "./pages/about";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Signin from "./pages/Signin";
import PrivateRoute from "./components/PrivateRoute";
import DynamicUserForm from "./pages/profileComp";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />*/}
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />}/>
        <Route path="/contacts" />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/profile" />
        <Route path="/settings" />
        <Route path="/profileComp" element={<PrivateRoute><DynamicUserForm/></PrivateRoute>}/>
      </Routes>
    </div>
  );
};

export default App;
