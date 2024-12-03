import React, { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../../api/userApi";

const UserTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

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
    await deleteUser(id);
    fetchUsers();
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
                <button
                  className="px-2 py-1 mr-2 text-white bg-red-500"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
                <button className="px-2 py-1 text-white bg-blue-500">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
