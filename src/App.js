import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import CustomerDashboard from "./components/CustomerDashboard";
import AdminDashboard from "./components/AdminDashboard";
import AiInsights from "./components/AiInsights";
import Terms from "./components/Terms";

function TitleManager() {
  const location = useLocation();

  useEffect(() => {
    const favicon = document.getElementById("favicon");
    const defaultFavicon = "/assets/loginimage.png"; // path inside public folder

    switch(location.pathname) {
      case "/":
        document.title = "GeoLoyaltyAI - Login";
        if (favicon) favicon.href = defaultFavicon;
        break;
      case "/register":
        document.title = "GeoLoyaltyAI - Register";
        if (favicon) favicon.href = defaultFavicon;
        break;
      case "/customer":
        document.title = "GeoLoyaltyAI - Customer Dashboard";
        if (favicon) favicon.href = defaultFavicon;
        break;
      case "/admin":
        document.title = "GeoLoyaltyAI - Admin Dashboard";
        if (favicon) favicon.href = defaultFavicon;
        break;
      case "/ai":
        document.title = "GeoLoyaltyAI - AI Insights";
        if (favicon) favicon.href = defaultFavicon;
        break;
      case "/terms":
        document.title = "GeoLoyaltyAI - Terms and Conditions";
        if (favicon) favicon.href = defaultFavicon;
        break;
      default:
        document.title = "GeoLoyaltyAI";
        if (favicon) favicon.href = defaultFavicon;
    }
  }, [location]);

  return null;
}

function App() {
  return (
    <Router>
      <TitleManager />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/customer" element={<CustomerDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/ai" element={<AiInsights />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </Router>
  );
}

export default App;
