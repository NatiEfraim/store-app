import React, { useEffect, useState } from "react";
import { getDrinks, deleteDrink } from "../../api/drinkApi";
import { useLocation, useNavigate } from "react-router-dom";
import { toast,ToastContainer } from "react-toastify";

const DrinkTable = () => {
  const [drinks, setDrinks] = useState([]);
  const navigate = useNavigate();

  const location=useLocation()
    useEffect(() => {
      if (location.state?.addingdrink) {
        toast.success("Drink added successfully!", { position: "top-right" });
      } else if (location.state?.error) {
        toast.error(location.state.error, { position: "top-right" });
      }
    }, [location]);


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
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <ToastContainer/>
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Drinks Management</h2>
      <table className="w-full table-auto border-collapse border border-gray-300 shadow-sm rounded-lg">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-6 py-3 border-b border-gray-200 text-left">Name</th>
            <th className="px-6 py-3 border-b border-gray-200 text-left">Volume (ml)</th>
            <th className="px-6 py-3 border-b border-gray-200 text-left">Price</th>
            <th className="px-6 py-3 border-b border-gray-200 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {drinks.map((drink) => (
            <tr key={drink._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 border-b border-gray-200 text-gray-700">{drink.name}</td>
              <td className="px-6 py-4 border-b border-gray-200 text-gray-700">{drink.ml}</td>
              <td className="px-6 py-4 border-b border-gray-200 text-gray-700">${drink.price.toFixed(2)}</td>
              <td className="px-6 py-4 border-b border-gray-200 flex items-center space-x-2">
                <button
                  className="px-3 py-1 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded shadow"
                  onClick={() => handleView(drink._id)}
                >
                  View
                </button>
                <button
                  className="px-3 py-1 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded shadow"
                  onClick={() => handleEdit(drink._id)}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded shadow"
                  onClick={() => handleDelete(drink._id)}
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
        <button
          className="px-6 py-3 text-white bg-green-500 hover:bg-green-600 font-medium text-sm rounded shadow"
          onClick={() => navigate("/drinks/add")}
        >
          Add New Drink
        </button>
      </div>
    </div>
  );
};

export default DrinkTable;
