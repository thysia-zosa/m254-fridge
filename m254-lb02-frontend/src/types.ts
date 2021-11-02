export type FridgeProps = {
    draggedFoodItem: FoodItem | undefined,
    dropCallback: () => void
};

export type FoodItemProps = {
    type: "carrots" | "cheese" | "milk",
    draggingCallback: () => void,
    hasOneInFridge: boolean
};

export type FoodItem = {
    id: string,
    type: string,
    expirationDate?: string,
    description?: string
};