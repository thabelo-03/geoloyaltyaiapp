import React, { useState, useEffect } from "react";
import { FaCoins, FaMedal, FaHistory, FaGift, FaUserCircle, FaCog, FaSignOutAlt, FaRobot } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./CustomerDashboard.css";

export default function CustomerDashboard() {
  const [wallet, setWallet] = useState({ points: 42, tier: "Silver", history: [], rewardsRedeemed: 0 });
  const [showAllHistory, setShowAllHistory] = useState(false);
  const [modalInfo, setModalInfo] = useState(null);
  const [menuModalOpen, setMenuModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const res = await fetch("/api/wallets/me", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await res.json();
        if (data.wallet) setWallet(data.wallet);
      } catch {
        console.error("Using default wallet data");
      }
    };
    fetchWallet();
  }, []);

  const historyToShow = showAllHistory ? wallet.history : wallet.history.slice(-3);

  return (
    <>
      <header className="dashboard-header">
        <h1>Customer Dashboard</h1>
        <div style={{ display: "flex", gap: "10px" }}>
          <button className="ai-header-btn" onClick={() => navigate("/ai")}>View AI Insights</button>
          <button className="ai-header-btn" onClick={() => setMenuModalOpen(true)} style={{ background: "#6b7280" }}>☰</button>
        </div>
      </header>

      <main className="dashboard scrollable">
        <div className="ai-insights-card pressable" onClick={() => navigate("/ai")}>
          <FaRobot className="ai-icon" />
          <div className="insight-text">Welcome! Your next reward is waiting, keep engaging.</div>
        </div>

        <div className="card"><h3>Points</h3><p>{wallet.points}</p></div>
        <div className="card"><h3>Tier</h3><p>{wallet.tier}</p></div>
        <div className="card"><h3>Rewards</h3><p>{wallet.rewardsRedeemed}</p></div>
        <div className="card">
          <h3>Recent Activities</h3>
          <ul>
            {historyToShow.map((e, i) => <li key={i}>{e.action} ({e.points})</li>)}
          </ul>
          {wallet.history.length > 3 && (
            <button onClick={() => setShowAllHistory(!showAllHistory)}>{showAllHistory ? "View Less" : "View More"}</button>
          )}
        </div>
      </main>

      {menuModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Menu</h2>
            <button><FaUserCircle /> Profile</button>
            <button><FaCog /> Settings</button>
            <button className="logout" onClick={() => { localStorage.clear(); window.location.href = "/"; }}>
              <FaSignOutAlt /> Logout
            </button>
            <button onClick={() => setMenuModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}
