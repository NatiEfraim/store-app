import React, { useState } from "react";
import { login } from "../api/userApi";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
    //   console.log();
      
      localStorage.setItem("token", response.data.token); // Store token
      navigate("/"); // Redirect to home page
    } catch (err) {
      console.error(err);
      alert("Login Failed");
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold">Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-2 mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border p-2 mb-4"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
