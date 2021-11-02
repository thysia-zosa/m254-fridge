import './App.css';
import FoodItem from './FoodItem';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Fridge from './Fridge';
import { useState } from 'react';

const App = () => {
  const [draggedFoodItem, setDraggedFoodItem] = useState<"carrots" | "cheese" | "milk">();
  const [isInFridgeMap, setIsInFridgeMap] = useState({
    carrots: false,
    cheese: false,
    milk: false
  });

  const putInFridge = () => {
    if (draggedFoodItem) {
      setIsInFridgeMap(prev => ({ ...prev, [draggedFoodItem]: true }));
      setDraggedFoodItem(undefined);
    }
  }

  return <DndProvider backend={HTML5Backend}>
    <div className="store">
      {(["carrots", "cheese", "milk"] as ("carrots" | "cheese" | "milk")[]).map(foodItem => <FoodItem type={foodItem} draggingCallback={() => setDraggedFoodItem(foodItem)} isInFridge={isInFridgeMap[foodItem]} />)}
    </div>
    <div className="fridge">
      <Fridge draggedFoodItem={draggedFoodItem} dropCallback={putInFridge} />
    </div>
    <div className="details">

    </div>
  </DndProvider>;
};

export default App;
