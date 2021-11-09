import axios from 'axios';
import { FoodItem } from './types';

const uuid = require("react-uuid");

const api = axios.create({ baseURL: "http://localhost:8087" });

export default {
    addFoodItem: (foodItem: FoodItem): Promise<void> => api.post("/", foodItem),
    getInventory: (): Promise<FoodItem[]> => api.get("/"),
    updateFoodItem: (foodItem: FoodItem): Promise<void> => api.put("/", foodItem),
    deleteFoodItem: (id: string): Promise<void> => api.delete(`/${id}`)
};