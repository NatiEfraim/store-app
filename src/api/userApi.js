import axios from "axios";

const API_URL = "http://localhost:3003/users";


export const login = (data) => axios.post(`${API_URL}/login`, data);
export const signup = (data) => axios.post(`${API_URL}/signup`, data);
export const getUsers = () => axios.get(`${API_URL}/usersList`);
export const addUser = (user) => axios.post(API_URL, user);
export const updateUser = (id, user) => axios.put(`${API_URL}/${id}`, user);
export const deleteUser = (id) => axios.delete(`${API_URL}/${id}`);