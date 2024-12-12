import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDrinkById } from "../../api/drinkApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DrinkDetails = () => {
  const { id } = useParams(); // Get drink ID from URL params
  const navigate = useNavigate(); // For navigation
  const [drink, setDrink] = useState(null); // Store drink details

  // Fetch drink details on component mount
  useEffect(() => {
    fetchDrinkDetails();
  }, [id]);

  const fetchDrinkDetails = async () => {
    try {
      const { data } = await getDrinkById(id);
      setDrink(data);
    } catch (error) {
      console.error("Error fetching drink details:", error.response?.data || error.message);
      toast.error("Failed to fetch drink details", { position: "top-right" });
    }
  };

  if (!drink) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-bold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Drink Details</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col items-center">
            <h2 className="text-lg font-semibold text-gray-600">Name</h2>
            <p className="text-xl text-gray-800">{drink.name}</p>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-lg font-semibold text-gray-600">Volume (ml)</h2>
            <p className="text-xl text-gray-800">{drink.ml}</p>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-lg font-semibold text-gray-600">Price</h2>
            <p className="text-xl text-gray-800">${drink.price}</p>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-lg font-semibold text-gray-600">Created By</h2>
            <p className="text-xl text-gray-800">{drink.user?.name || "N/A"}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="flex flex-col items-center">
            <h2 className="text-lg font-semibold text-gray-600">Created At</h2>
            <p className="text-sm text-gray-700">{drink.createdAt}</p>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-lg font-semibold text-gray-600">Updated At</h2>
            <p className="text-sm text-gray-700">{drink.updatedAt}</p>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            onClick={() => navigate(`/drinks/edit/${drink._id}`)}
          >
            Edit Drink
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
            onClick={() => navigate("/drinks")}
          >
            Back to Drinks
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DrinkDetails;
