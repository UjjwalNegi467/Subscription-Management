
import { useEffect, useState } from "react";
import "./subscription.css";
import { useLocation } from "react-router-dom";

const Subscription = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = await fetch("http://localhost:5000/api/user/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setUser(data);
  };
  useEffect(() => {
  // Always fetch logged-in user on mount
  fetchUser();
}, []);
useEffect(() => {
  const query = new URLSearchParams(location.search);

  if (query.get("success") === "true") {
    // Show a loading message
    let attempts = 0;
    const interval = setInterval(async () => {
      attempts++;
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUser(data);

      if (data.subscription || attempts > 10) { // stop after 10 tries (~20 sec)
        clearInterval(interval);
        if (data.subscription) alert("Payment successful! Subscription updated.");
        else alert("Payment completed but subscription not updated yet.");
      }
    }, 2000); // poll every 2 seconds
  } else if (query.get("cancelled") === "true") {
    alert("Payment cancelled.");
  }
}, [location]);
  //  Subscribe (IMMEDIATE update)
  const subscribe = async (plan) => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    "http://localhost:5000/api/stripe/create-checkout-session",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ plan })
    }
  );

  const data = await res.json();
  window.location.href = data.url;
};

  //  Cancel subscription
  const cancelSubscription = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      "http://localhost:5000/api/user/subscription/cancel",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const data = await res.json();
    setUser(data.user);
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="subscription-container">

      {/* User Info */}
      <div className="user-card">
        <h2>Welcome, {user.name}</h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p>
          <strong>Current Plan:</strong>{" "}
          {user.subscription ? user.subscription : "None"}
        </p>
      </div>

      {/* Plans */}
      <div className="plans">
        <h3>Choose a Plan</h3>

        <button
          className={user.subscription === "$9" ? "active" : ""}
          onClick={() => subscribe("$9")}
        >
          $9 Plan
        </button>

        <button
          className={user.subscription === "$50" ? "active" : ""}
          onClick={() => subscribe("$50")}
        >
          $50 Plan
        </button>

        <button
          className={user.subscription === "$100" ? "active" : ""}
          onClick={() => subscribe("$100")}
        >
          $100 Plan
        </button>
      </div>

      {/* Cancel */}
      {user.subscription && (
        <button className="cancel-btn" onClick={cancelSubscription}>
          Cancel Subscription
        </button>
      )}
    </div>
  );
};

export default Subscription;
