import axios from "axios";

const API_URL = "http://localhost:3003/drinks";

export const getDrinks = () => axios.get(`${API_URL}/index`);
export const addDrink = (drink) => axios.post(API_URL, drink);
export const updateDrink = (id, drink) => axios.put(`${API_URL}/${id}`, drink);
export const deleteDrink = (id) => axios.delete(`${API_URL}/${id}`);