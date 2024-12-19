import React, { useState } from "react";
import { addDrink } from "../../api/drinkApi";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

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
      toast.success("Drink added successfully!", { position: "top-right" });
      navigate("/drinks");
    } catch (error) {
      console.error("Error adding drink:", error.response?.data || error.message);
      toast.error("Failed to add drink.", { position: "top-right" });
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Drink</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Volume (ml)</label>
          <input
            type="text"
            name="ml"
            value={formData.ml}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Price</label>
          <input
            type="number"
            step="0.01"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex justify-between mt-4">
          <button
            type="button"
            className="px-4 py-2 text-white bg-gray-500 rounded"
            onClick={() => navigate("/drinks")}
          >
            Back to Drinks
          </button>
          <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded">
            Add Drink
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddDrink;
