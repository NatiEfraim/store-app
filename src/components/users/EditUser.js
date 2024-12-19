import React, { useState, useEffect } from "react";
import { getUserById, updateUser } from "../../api/userApi";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditUser = () => {
  const { id } = useParams(); // Get user ID from URL params
  const navigate = useNavigate(); // To redirect back to user list
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
  });
  const [loading, setLoading] = useState(false); // Prevent duplicate submissions

  // Fetch user data by ID
  useEffect(() => {
    fetchUserData();
  }, [id]);

  const fetchUserData = async () => {
    try {
      const { data } = await getUserById(id);
      setFormData({
        name: data.name,
        email: data.email,
        role: data.role,
      });
    } catch (error) {
      console.error("Error fetching user data:", error.response?.data || error.message);
      toast.error("Failed to fetch user data", { position: "top-right" });
      navigate("/users");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return; // Prevent duplicate form submissions
    setLoading(true);

    try {
      await updateUser(id, formData);
      toast.success("User updated successfully!", { position: "top-right" });
      navigate("/users"); // Redirect to the user list page
    } catch (error) {
      console.error("Error updating user:", error.response?.data || error.message);
      toast.error(`Failed to update user: ${error.response?.data?.msg || error.message}`, {
        position: "top-right",
      });
    } finally {
      setLoading(false); // Re-enable the form
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <ToastContainer />
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-extrabold text-blue-600 mb-6 text-center">
          Edit User
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="superadmin">Super Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className={`w-full py-3 text-white rounded-lg shadow-lg transition-transform transform ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 hover:scale-105"
            }`}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update User"}
          </button>
        </form>
        <button
          onClick={() => navigate("/users")}
          className="w-full mt-4 py-3 text-white bg-gray-500 hover:bg-gray-600 rounded-lg shadow-lg transition-transform transform hover:scale-105"
        >
          Back to User List
        </button>
      </div>
    </div>
  );
};

export default EditUser;
