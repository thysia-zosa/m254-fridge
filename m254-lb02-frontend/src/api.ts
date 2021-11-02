import axios from 'axios';
import { FoodItem } from './types';

const api = axios.create({ baseURL: "http://localhost:8087" });

/* export default {
    addFoodItem: (foodItem: FoodItem): Promise<void> => api.post("/", foodItem),
    getInventory: (): Promise<FoodItem[]> => api.get("/"),
    updateFoodItem: (foodItem: FoodItem): Promise<void> => api.put("/", foodItem),
    deleteFoodItem: (id: string): Promise<void> => api.delete(`/${id}`)
}; */

export default {
    addFoodItem: (foodItem: FoodItem): Promise<void> => new Promise(res => setTimeout(res, 500)),
    getInventory: (): Promise<FoodItem[]> => new Promise(res => setTimeout(() => res([
        {
            id: "test0",
            type: "carrots",
            expirationDate: "2021-11-09",
            description: "Bio"
        },
        {
            id: "test1",
            type: "cheese",
            expirationDate: "2021-11-15",
            description: "Schafskäse"
        }
    ]), 500)),
    updateFoodItem: (foodItem: FoodItem): Promise<void> => new Promise(res => setTimeout(res, 500)),
    deleteFoodItem: (id: string): Promise<void> => new Promise(res => setTimeout(res, 500))
};