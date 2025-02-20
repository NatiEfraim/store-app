import axios from "axios";

const API_URL = "http://localhost:3003/users";

// Add `withCredentials: true` to enable cookies
const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
  });

/**
 * Login user
 * @param {Object} data - User login credentials
 * @returns {Object} - Response data or error
 */
export const login = async (data) => {

  try {

    const response = await axiosInstance.post(`/login`, data);
    
    return response.data;
  } catch (error) {
    console.log("Error in login:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Get the role of the authenticated user
 * @returns {Object} - User role or error
 */
export const getRoleAuthUser = async () => {
  try {
    const response = await axiosInstance.get("/auth-user");
    return response.data;
  } catch (error) {
    console.error("Error in getRoleAuthUser:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Logout the current user
 * @returns {Object} - Logout response or error
 */
export const logout = async () => {
  try {
    const response = await axiosInstance.post("/logout");
    localStorage.removeItem("token"); // Clear the token from localStorage
    return response.data;
  } catch (error) {
    console.error("Error in logout:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Signup new user
 * @param {Object} data - New user details
 * @returns {Object} - Response data or error
 */
export const signup = async (data) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/signup`, data);
    return response.data;
  } catch (error) {
    console.log("Error in signup:", error.response?.data || error.message);
    throw error;
  }
};


/**
 * Fetch authenticated user information
 * @returns {Object} - User information or error
 */
export const getUserInfo = async () => {
  try {
    const response = await axiosInstance.get("/user");
    return response.data;
  } catch (error) {
    console.log("Error in getUserInfo:", error.response?.data || error.message);
    throw error; 
  }
};


/**
 * Fetch list of users
 * @returns {Array} - List of users or error
 */
export const getUsers = async () => {
  try {
    const response = await axiosInstance.get(`/index`);
    return response.data;
  } catch (error) {
    console.log("Error in getUsers:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Add a new user
 * @param {Object} user - New user details
 * @returns {Object} - Response data or error
 */
export const addUser = async (user) => {
  try {
    const response = await axiosInstance.post(API_URL, user);
    return response.data;
  } catch (error) {
    console.log("Error in addUser:", error.response?.data || error.message);
    throw error;
  }
};


/**
 * Delete user by ID
 * @param {String} id - User ID
 * @returns {Object} - Response data or error
 */
export const deleteUser = async (id) => {
  try {
    const response = await axiosInstance.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error in deleteUser:", error.response?.data || error.message);
    throw error;
  }

};


/**
 * Fetch user by ID
 * @param {String} id - User ID
 * @returns {Object} - User data
 */
export const getUserById = async (id) => {
  try {
    const response = await axiosInstance.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error in getUserById:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Update user by ID
 * @param {String} id - User ID
 * @param {Object} user - Updated user data
 * @returns {Object} - Updated user response
 */


export const updateUser = async (id, user) => {
  try {
    const response = await axiosInstance.put(`/${id}`, user);
    return response.data;
  } catch (error) {
    console.error("Error in updateUser:", error.response?.data || error.message);
    throw error;
  }
};