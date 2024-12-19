import React, { useEffect, useState } from "react";
import { getUsers, deleteUser, getUserInfo } from "../../api/userApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserTable = () => {
  const [users, setUsers] = useState([]); // Store users
  const [authUser, setAuthUser] = useState({}); // Store authenticated user info
  const navigate = useNavigate(); // Navigation for routing

  // Fetch authenticated user info
  const getAuthUser = async () => {
    try {
      const { data: user } = await getUserInfo();
      setAuthUser(user);
    } catch (error) {
      console.error("Error fetching user info:", error.response?.data || error.message);
      toast.error("Failed to fetch user info. Redirecting to Home Page.", { position: "top-right" });
      navigate("/"); // Redirect to home page on error
    }
  };

  useEffect(() => {
    getAuthUser(); // Fetch auth user info
    fetchUsers(); // Fetch all users
  }, []);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const { data } = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error.response?.data || error.message);
      toast.error("Failed to fetch users.", { position: "top-right" });
    }
  };

  // Delete a user
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id);
        toast.success("User deleted successfully!", { position: "top-right" });
        fetchUsers(); // Refresh the user list
      } catch (error) {
        console.error("Error deleting user:", error.response?.data || error.message);
        toast.error("Failed to delete user.", { position: "top-right" });
      }
    }
  };

  // Navigate to Edit User page
  const handleEdit = (id) => {
    navigate(`/users/edit/${id}`);
  };

  // Navigate to View User Details page
  const handleView = (id) => {
    navigate(`/users/details/${id}`);
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Users Management</h2>
      <table className="w-full table-auto border-collapse border border-gray-300 shadow-sm rounded-lg">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-6 py-3 border-b border-gray-200 text-left">Name</th>
            <th className="px-6 py-3 border-b border-gray-200 text-left">Email</th>
            <th className="px-6 py-3 border-b border-gray-200 text-left">Role</th>
            <th className="px-6 py-3 border-b border-gray-200 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 border-b border-gray-200 text-gray-700">{user.name}</td>
              <td className="px-6 py-4 border-b border-gray-200 text-gray-700">{user.email}</td>
              <td className="px-6 py-4 border-b border-gray-200 text-gray-700">{user.role}</td>
              <td className="px-6 py-4 border-b border-gray-200 flex items-center space-x-2">
                <button
                  className="px-3 py-1 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded shadow"
                  onClick={() => handleView(user._id)}
                >
                  View
                </button>
                <button
                  className="px-3 py-1 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded shadow"
                  onClick={() => handleEdit(user._id)}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded shadow"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-6">
        <button
          className="px-6 py-3 text-white bg-gray-700 hover:bg-gray-800 font-medium text-sm rounded shadow"
          onClick={() => navigate("/")}
        >
          Back to Dashboard
        </button>
        {(authUser.role === "admin" || authUser.role === "superadmin") && (
          <button
            className="px-6 py-3 text-white bg-green-500 hover:bg-green-600 font-medium text-sm rounded shadow"
            onClick={() => navigate("/users/add")}
          >
            Add New User
          </button>
        )}
      </div>
    </div>
  );
};

export default UserTable;
