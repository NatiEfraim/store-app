import React, { useState } from "react";
import { addDrink } from "../../api/drinkApi";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddDrink = () => {
  const [formData, setFormData] = useState({ name: "", ml: "", price: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      await addDrink(formData);
      toast.success("Drink added successfully!", { 
          position: "top-right",
          autoClose: 3000, 
      });
      navigate("/drinks",{state:{addingdrink:true}});
    } catch (error) {
      console.error("Error adding drink:", error.response?.data || error.message);
      navigate("/drinks",{state:{error:'faild to add a drink'}});
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <ToastContainer />
      <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Add New Drink</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Volume (ml)</label>
            <input
              type="text"
              name="ml"
              value={formData.ml}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Price</label>
            <input
              type="number"
              step="0.01"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="flex justify-between mt-6">
            <button
              type="button"
              className="px-6 py-2 text-sm font-semibold text-white bg-gray-500 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300"
              onClick={() => navigate("/drinks")}
            >
              Back to Drinks
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Add Drink
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDrink;
