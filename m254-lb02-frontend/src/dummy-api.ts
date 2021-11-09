import { FoodItem } from './types';

const uuid = require("react-uuid");

const makeString = (length: number) => {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz     ';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

export default {
    addFoodItem: (foodItem: FoodItem): Promise<void> => {
        console.log("addFoodItem", foodItem);
        return new Promise(res => setTimeout(res, 500));
    },
    getInventory: (): Promise<FoodItem[]> => {
        console.log("getInventory");
        return new Promise(res => setTimeout(() => res(new Array(15).fill(undefined).map((v, k) => ({
            id: uuid(),
            type: ["carrots", "cheese", "milk"][Math.floor(Math.random() * 3)],
            expirationDate: `20${Math.floor(Math.random() * 10) + 21}-` + `${Math.ceil(Math.random() * 12)}-`.padStart(3, '0') + `${Math.ceil(Math.random() * 28)}`.padStart(2, '0'),
            description: makeString(Math.floor(Math.random() * 40) + 10).trim()
        }))), 500));
    },
    updateFoodItem: (foodItem: FoodItem): Promise<void> => {
        console.log("updateFoodItem", foodItem);
        return new Promise(res => setTimeout(res, 500));
    },
    deleteFoodItem: (id: string): Promise<void> => {
        console.log("deleteFoodItem", id);
        return new Promise(res => setTimeout(res, 500));
    }
};