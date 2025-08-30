import React, { useState, useEffect } from "react";
import { FaUsers, FaBuilding, FaChartPie, FaCogs, FaFileAlt, FaBrain } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [tenantName, setTenantName] = useState("");
  const [insightIndex, setInsightIndex] = useState(0);
  const [modalInfo, setModalInfo] = useState(null);
  const navigate = useNavigate();

  const insights = [
    "🔮 Predictions show +12% tenant growth next month.",
    "⚡ System health is Optimal.",
    "📊 User engagement up by 18% this week.",
    "🤖 AI detected 3 anomalies in tenant activities.",
    "🚀 Revenue forecast +25% for the next quarter.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setInsightIndex((prev) => (prev + 1) % insights.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const createTenant = async () => {
    if (!tenantName) return alert("Enter a tenant name");
    try {
      const res = await fetch("/api/tenants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: tenantName }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Error creating tenant");
      alert("Tenant created!");
      setTenantName("");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="admin-dashboard scrollable">
      <header className="dashboard-header">
        <h1>⚡ Admin Dashboard</h1>
        <p>AI Powered Control Center</p>
      </header>

      <div className="ai-insights-card">
        <FaBrain className="ai-icon" />
        <div>
          <h2>AI Insights</h2>
          <p className="insight-text">{insights[insightIndex]}</p>
          <button onClick={() => navigate("/ai")}>View AI Insights</button>
        </div>
      </div>

      <div className="management-grid">
        <div className="management-card">
          <FaBuilding className="icon" />
          <h3>Tenant Management</h3>
          <input type="text" placeholder="Enter tenant name" value={tenantName} onChange={(e) => setTenantName(e.target.value)} />
          <button onClick={createTenant}>Create Tenant</button>
        </div>

        <div className="management-card">
          <FaUsers className="icon" />
          <h3>User Management</h3>
          <p>View and manage users for all tenants.</p>
          <button>Manage Users</button>
        </div>

        <div className="management-card">
          <FaChartPie className="icon" />
          <h3>Analytics</h3>
          <div className="progress-bar"><div className="progress-fill" style={{ width: "75%" }}></div></div>
          <p>System Usage: 75%</p>
          <button>View Analytics</button>
        </div>

        <div className="management-card">
          <FaCogs className="icon" />
          <h3>System Settings</h3>
          <p>Configure global preferences and security.</p>
          <button>Open Settings</button>
        </div>

        <div className="management-card">
          <FaFileAlt className="icon" />
          <h3>AI Reports</h3>
          <button onClick={() => navigate("/ai")}>View AI Reports</button>
        </div>
      </div>
    </div>
  );
}
