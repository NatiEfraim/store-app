import React, { useState, useEffect } from "react";
import { getUserInfo } from "../../api/userApi";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const UserDetails = () => {
  const { id } = useParams(); // Extract user ID from URL
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const fetchUserDetails = async () => {
    try {
      const { data } = await getUserInfo(id);
      setUser(data);
    } catch (error) {
      console.error("Error fetching user details:", error.response?.data || error.message);
      toast.error("Failed to fetch user details.", { position: "top-right" });
      navigate("/users");
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [id]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-lg text-gray-600 animate-pulse">Loading user details...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <ToastContainer />
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-extrabold text-blue-600 mb-6 text-center">
          User Details
        </h2>
        <ul className="space-y-4">
          <li className="flex justify-between">
            <span className="font-semibold text-gray-700">ID:</span>
            <span className="text-gray-600">{user._id}</span>
          </li>
          <li className="flex justify-between">
            <span className="font-semibold text-gray-700">Name:</span>
            <span className="text-gray-600">{user.name}</span>
          </li>
          <li className="flex justify-between">
            <span className="font-semibold text-gray-700">Email:</span>
            <span className="text-gray-600">{user.email}</span>
          </li>
          <li className="flex justify-between">
            <span className="font-semibold text-gray-700">Role:</span>
            <span className="capitalize text-gray-600">{user.role}</span>
          </li>
          <li className="flex justify-between">
            <span className="font-semibold text-gray-700">Created At:</span>
            <span className="text-gray-600">{user.createdAt}</span>
          </li>
          <li className="flex justify-between">
            <span className="font-semibold text-gray-700">Updated At:</span>
            <span className="text-gray-600">{user.updatedAt}</span>
          </li>
        </ul>
        <div className="mt-6 text-center">
          <button
            className="px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            onClick={() => navigate("/users")}
          >
            Back to Users
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
