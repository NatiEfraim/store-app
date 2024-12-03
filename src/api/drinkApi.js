// src/api/drinkApi.js

import axios from "axios";

const API_URL = "http://localhost:3003/drinks";

// Create an axios instance with withCredentials: true
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

/**
 * Fetch list of drinks
 * @returns {Array} - List of drinks or error
 */
export const getDrinks = async () => {
  try {
    const response = await axiosInstance.get(`/`);
    return response.data;
  } catch (error) {
    console.error("Error in getDrinks:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Add a new drink
 * @param {Object} drink - New drink details
 * @returns {Object} - Response data or error
 */
export const addDrink = async (drink) => {
  try {
    const response = await axiosInstance.post(`/`, drink);
    return response.data;
  } catch (error) {
    console.error("Error in addDrink:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Update drink by ID
 * @param {String} id - Drink ID
 * @param {Object} drink - Updated drink details
 * @returns {Object} - Response data or error
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
 * Delete drink by ID
 * @param {String} id - Drink ID
 * @returns {Object} - Response data or error
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

/**
 * Fetch drinks by user ID
 * @param {String} userId - User ID
 * @returns {Array} - List of drinks for the user or error
 */
export const getDrinksByUser = async (userId) => {
  try {
    const response = await axiosInstance.get(`/user-drink/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error in getDrinksByUser:", error.response?.data || error.message);
    throw error;
  }
};
