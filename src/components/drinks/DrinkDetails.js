import React, { useEffect, useState } from "react";
import { getDrinkById } from "../../api/drinkApi";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const DrinkDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [drink, setDrink] = useState(null);

  useEffect(() => {
    fetchDrink();
  }, [id]);

  const fetchDrink = async () => {
    try {
      const { data } = await getDrinkById(id);
      setDrink(data);
    } catch (error) {
      console.error("Error fetching drink details:", error.response?.data || error.message);
      toast.error("Failed to fetch drink details.", { position: "top-right" });
    }
  };

  if (!drink) return null;

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Drink Details</h2>
      <p>
        <strong>Name:</strong> {drink.name}
      </p>
      <p>
        <strong>Volume (ml):</strong> {drink.ml}
      </p>
      <p>
        <strong>Price:</strong> {drink.price}
      </p>
      <button
        className="mt-4 px-4 py-2 text-white bg-blue-500 rounded"
        onClick={() => navigate("/drinks")}
      >
        Back to Drinks
      </button>
      <ToastContainer />
    </div>
  );
};

export default DrinkDetails;
