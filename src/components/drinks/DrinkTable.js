import React, { useEffect, useState } from "react";
import { getDrinks, deleteDrink } from "../../api/drinkApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DrinkTable = () => {
  const [drinks, setDrinks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDrinks();
  }, []);

  const fetchDrinks = async () => {
    try {
      const { data } = await getDrinks();
      setDrinks(data);
    } catch (error) {
      console.error("Error fetching drinks:", error.response?.data || error.message);
      toast.error("Failed to fetch drinks.", { position: "top-right" });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this drink?")) {
      try {
        await deleteDrink(id);
        toast.success("Drink deleted successfully!", { position: "top-right" });
        fetchDrinks(); // Refresh drink list
      } catch (error) {
        console.error("Error deleting drink:", error.response?.data || error.message);
        toast.error("Failed to delete drink.", { position: "top-right" });
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/drinks/edit/${id}`);
  };

  const handleView = (id) => {
    navigate(`/drinks/details/${id}`);
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Drinks Management</h2>
      <table className="w-full border border-collapse border-gray-200 table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 border border-gray-300">Name</th>
            <th className="px-4 py-2 border border-gray-300">Volume (ml)</th>
            <th className="px-4 py-2 border border-gray-300">Price</th>
            <th className="px-4 py-2 border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {drinks.map((drink) => (
            <tr key={drink._id}>
              <td className="px-4 py-2 border border-gray-300">{drink.name}</td>
              <td className="px-4 py-2 border border-gray-300">{drink.ml}</td>
              <td className="px-4 py-2 border border-gray-300">{drink.price}</td>
              <td className="px-4 py-2 border border-gray-300">
                <button
                  className="px-2 py-1 mr-2 text-white bg-blue-500 rounded"
                  onClick={() => handleView(drink._id)}
                >
                  View
                </button>
                <button
                  className="px-2 py-1 mr-2 text-white bg-green-500 rounded"
                  onClick={() => handleEdit(drink._id)}
                >
                  Edit
                </button>
                <button
                  className="px-2 py-1 text-white bg-red-500 rounded"
                  onClick={() => handleDelete(drink._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button
          className="px-4 py-2 text-white bg-gray-500 rounded"
          onClick={() => navigate("/")}
        >
          Back to Dashboard
        </button>
        <button
          className="px-4 py-2 text-white bg-green-500 rounded"
          onClick={() => navigate("/drinks/add")}
        >
          Add New Drink
        </button>
      </div>
    </div>
  );
};

export default DrinkTable;
