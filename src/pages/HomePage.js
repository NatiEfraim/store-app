import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/login"; // Redirect to login if not authenticated
    return null;
  }

  return (
    <div className="container mx-auto text-center mt-10">
      <h1 className="text-4xl font-bold mb-6">Welcome to the Dashboard</h1>
      <div className="flex justify-center space-x-4">
        <Link to="/users" className="bg-blue-500 text-white px-4 py-2 rounded">
          Blablablabla
        </Link>
        <Link to="/drinks" className="bg-green-500 text-white px-4 py-2 rounded">
          Manage Drinks
        </Link>
        <Link to="/categories" className="bg-yellow-500 text-white px-4 py-2 rounded">
          Manage Categories
        </Link>
        <Link to="/products" className="bg-purple-500 text-white px-4 py-2 rounded">
          Manage Products
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
