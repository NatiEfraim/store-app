import axios from "axios";

const API_URL = "http://localhost:3003/drinks";
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

/**
 * Fetch all drinks
 */
export const getDrinks = async () => {
  try {
    const response = await axiosInstance.get("/index");
    return response.data;
  } catch (error) {
    console.error("Error in getDrinks:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Fetch drink by ID
 */
export const getDrinkById = async (id) => {
  try {
    const response = await axiosInstance.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error in getDrinkById:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Add a new drink
 */
export const addDrink = async (drink) => {
  try {
    const response = await axiosInstance.post("/", drink);
    return response.data;
  } catch (error) {
    console.error("Error in addDrink:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Update an existing drink
 */
export const updateDrink = async (id, drink) => {
  try {
    const response = await axiosInstance.put(`/${id}`, drink);
    return response.data;
  } catch (error) {
    console.error("Error in updateDrink:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Delete a drink
 */
export const deleteDrink = async (id) => {
  try {
    const response = await axiosInstance.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error in deleteDrink:", error.response?.data || error.message);
    throw error;
  }
};
