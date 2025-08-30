import React from "react";

export default function Terms() {
  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Terms & Conditions - GeoLoyaltyAI</h1>
      <p>By registering and using GeoLoyaltyAI, you agree to the following:</p>
      <ul>
        <li>We store your user data securely in Firebase Realtime Database.</li>
        <li>Passwords are hashed and not stored in plain text.</li>
        <li>Loyalty points and rewards are managed based on program rules.</li>
        <li>AI-generated insights may be used to personalize offers.</li>
        <li>You may receive notifications, emails, or offers related to loyalty programs.</li>
      </ul>
      <p>Please read carefully before registering.</p>
    </div>
  );
}
