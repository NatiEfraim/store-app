import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/login"; // Redirect to login if not authenticated
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      {/* Welcome Section */}
      <div className="bg-white shadow-lg rounded-lg p-8 w-3/4 text-center">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-6">
          Welcome to the Management Dashboard
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          Our system is designed to help you efficiently manage your business operations. 
          Whether you're keeping track of users, managing an inventory of drinks, organizing categories, 
          or handling product details, this dashboard provides all the tools you need.
        </p>
      </div>

      {/* Navigation Section */}
      <div className="mt-10 w-3/4 grid grid-cols-2 md:grid-cols-4 gap-6">
        <Link
          to="/users"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-4 rounded-lg shadow-md text-center"
        >
          <h3 className="text-lg font-semibold">Manage Users</h3>
          <p className="text-sm">Add, edit, or delete users.</p>
        </Link>
        <Link
          to="/drinks"
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-lg shadow-md text-center"
        >
          <h3 className="text-lg font-semibold">Manage Drinks</h3>
          <p className="text-sm">Keep your drink inventory updated.</p>
        </Link>
        <Link
          to="/categories"
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-4 rounded-lg shadow-md text-center"
        >
          <h3 className="text-lg font-semibold">Manage Categories</h3>
          <p className="text-sm">Organize products into categories.</p>
        </Link>
        <Link
          to="/products"
          className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-4 rounded-lg shadow-md text-center"
        >
          <h3 className="text-lg font-semibold">Manage Products</h3>
          <p className="text-sm">Add, update, or delete products.</p>
        </Link>
      </div>

      {/* About Section */}
      <div className="bg-gray-50 shadow-lg rounded-lg p-8 w-3/4 mt-12 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">About the System</h2>
        <p className="text-gray-600 leading-relaxed">
          Imagine you're running a vibrant café or an online store. Managing your resources efficiently is the key to success.
          This dashboard is built to simplify your workflow:
        </p>
        <ul className="mt-6 space-y-4 text-left text-gray-700">
          <li className="flex items-start">
            <span className="bg-blue-500 text-white w-6 h-6 flex items-center justify-center rounded-full mr-4">1</span>
            <span>
              <strong>Users Management:</strong> Track your customers, staff, and administrators. Assign roles, edit details, and remove inactive users.
            </span>
          </li>
          <li className="flex items-start">
            <span className="bg-green-500 text-white w-6 h-6 flex items-center justify-center rounded-full mr-4">2</span>
            <span>
              <strong>Drinks Management:</strong> Keep your drink menu fresh and updated with detailed information about each beverage.
            </span>
          </li>
          <li className="flex items-start">
            <span className="bg-yellow-500 text-white w-6 h-6 flex items-center justify-center rounded-full mr-4">3</span>
            <span>
              <strong>Categories Organization:</strong> Create a seamless experience for customers by categorizing products effectively.
            </span>
          </li>
          <li className="flex items-start">
            <span className="bg-purple-500 text-white w-6 h-6 flex items-center justify-center rounded-full mr-4">4</span>
            <span>
              <strong>Product Management:</strong> Showcase your products with proper descriptions and pricing to maximize sales.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
