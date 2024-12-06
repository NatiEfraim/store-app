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
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto">
      <ToastContainer />
      <div className="max-w-lg p-6 mx-auto bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-blue-600">User Details</h2>
        <ul className="space-y-4">
          <li>
            <strong>ID:</strong> {user._id}
          </li>
          <li>
            <strong>Name:</strong> {user.name}
          </li>
          <li>
            <strong>Email:</strong> {user.email}
          </li>
          <li>
            <strong>Role:</strong> {user.role}
          </li>
          <li>
            <strong>Created At:</strong> {user.createdAt}
          </li>
          <li>
            <strong>Updated At:</strong> {user.updatedAt}
          </li>
        </ul>
        <button
          className="px-4 py-2 mt-4 text-white bg-gray-500 rounded"
          onClick={() => navigate("/users")}
        >
          Back to Users
        </button>
      </div>
    </div>
  );
};

export default UserDetails;
