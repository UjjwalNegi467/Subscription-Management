import { useState } from "react";
import "./Login.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
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
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert("Signup successful! Please login.");
      console.log(data);

      setFormData({
        name: "",
        email: "",
        password: ""
      });
    } catch (error) {
      console.error("Signup error", error);
      alert("Server error");
    }
  };

  return (
    <>
      <h1>Sign-Up</h1>
      <form onSubmit={handleSubmit} className="f1">

        <label>Email</label>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email"
        />

        <label>Name</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter name"
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
        />

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Signup;