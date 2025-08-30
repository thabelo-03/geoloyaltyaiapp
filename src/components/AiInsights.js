import React, { useState } from "react";
import { FaBrain } from "react-icons/fa";
import './AiInsights.css';

export default function AiInsights() {
  const [query, setQuery] = useState("");
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(false);

  const getInsight = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await fetch("/api/ai/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: query }),
      });
      const data = await res.json();
      setInsight(data.insights || "No insights generated");
    } catch {
      setInsight("Failed to generate insights.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-card">
      <div className="ai-card-header">
        <FaBrain className="ai-icon" />
        <h2>GeoLoyaltyAI Assistant</h2>
      </div>

      <textarea placeholder="Ask AI about customer behavior..." value={query} onChange={(e) => setQuery(e.target.value)} />

      <button onClick={getInsight} disabled={loading}>{loading ? "Analyzing..." : "Get Insight"}</button>

      <div className="ai-output">
        {insight.split("\n").map((line, i) => <p key={i}>{line}</p>)}
      </div>
    </div>
  );
}
