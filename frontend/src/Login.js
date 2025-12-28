

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      //  Login failed
      if (!response.ok) {
        alert(data.message || "Login failed");
        return;
      }

localStorage.setItem("token", data.token);
localStorage.setItem("role", data.user.role); // SAVE ROLE
alert("Login successful");

if (data.user.role === "admin") {
  navigate("/admin");
} else {
  navigate("/subscription");
}

    } catch (error) {
      console.error("Login error:", error);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="f1">

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your registered email"
          required
        />

        <br />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />

        <br />

        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
