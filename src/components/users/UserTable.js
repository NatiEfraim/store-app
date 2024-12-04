import React, { useEffect, useState } from "react";
import { getUsers, deleteUser, getUserInfo } from "../../api/userApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [authUser, setAuthUser] = useState({});
  const navigate = useNavigate();

  // Function to check the role of the authenticated user
  const getAuthUser = async () => {
    try {
      const { data: user } = await getUserInfo();
      setAuthUser(user);
    } catch (error) {
      console.error("Error fetching user info:", error.response?.data || error.message);
      toast.error("Failed to fetch user info. Redirecting to Home Page.", { position: "top-right" });
      navigate("/"); // Redirect to HomePage on error
    }
  };

  useEffect(() => {
    getAuthUser();
    fetchUsers();
  },[]);

  const fetchUsers = async () => {
    try {
      const { data } = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error.response?.data || error.message);
      alert("Failed to fetch users.");
    }
  };

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

  const handleEdit = (id) => {
    navigate(`/users/edit/${id}`); // Navigate to the edit user page
  };

  return (
    <div className="container mx-auto">
      <h2 className="mb-4 text-2xl font-bold">Users</h2>
      <table className="w-full border border-collapse border-gray-200 table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 border border-gray-300">Name</th>
            <th className="px-4 py-2 border border-gray-300">Email</th>
            <th className="px-4 py-2 border border-gray-300">Role</th>
            <th className="px-4 py-2 border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="px-4 py-2 border border-gray-300">{user.name}</td>
              <td className="px-4 py-2 border border-gray-300">{user.email}</td>
              <td className="px-4 py-2 border border-gray-300">{user.role}</td>
              <td className="px-4 py-2 border border-gray-300">
                {authUser.role === "admin" && (
                  <>
                    <button
                      className="px-2 py-1 mr-2 text-white bg-red-500 rounded"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="px-2 py-1 text-white bg-blue-500 rounded"
                      onClick={() => handleEdit(user._id)}
                    >
                      Edit
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {authUser.role === "admin" && (
        <button
          className="px-4 py-2 mt-4 text-white bg-green-500 rounded"
          onClick={() => navigate("/users/add")}
        >
          Add New User
        </button>
      )}
    </div>
  );
};

export default UserTable;
