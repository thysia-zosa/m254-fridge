import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import './App.css';
import FoodItem from './FoodItem';
import Fridge from './Fridge';
import api from './api';
import { FoodItem as FoodItemType } from './types';

const uuid = require('react-uuid');

const App = () => {
  const [draggedFoodItem, setDraggedFoodItem] = useState<FoodItemType>();
  const [fridgeContent, setFridgeContent] = useState<FoodItemType[]>([]);
  const [addFoodDialogOpen, setAddFoodDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState("");

  const putInFridge = () => {
    if (draggedFoodItem) {
      setSelectedDate(new Date().toISOString().split('T')[0]);
      setDescription("");
      setAddFoodDialogOpen(true);
    }
  }

  const addFoodDialogSubmit = () => {
    if (draggedFoodItem) {
      api.addFoodItem(draggedFoodItem).then(() => {
        setFridgeContent(prev => [...prev, draggedFoodItem]);
        setDraggedFoodItem(undefined);
      });
    }
  }

  useEffect(() => {
    api.getInventory().then(inventory => {

    });
  }, []);

  return <DndProvider backend={HTML5Backend}>
    <div className="store">
      {["carrots", "cheese", "milk"].map(foodItem => <FoodItem type={foodItem as "carrots" | "cheese" | "milk"} draggingCallback={() => setDraggedFoodItem({
        id: uuid(),
        type: foodItem,
        expirationDate: undefined,
        description: undefined
      } as FoodItemType)} hasOneInFridge={!!fridgeContent.find(({ type }) => type === foodItem)} />)}
    </div>
    <div className="fridge">
      <Fridge draggedFoodItem={draggedFoodItem} dropCallback={putInFridge} />
      <Dialog open={addFoodDialogOpen} onClose={() => setAddFoodDialogOpen(false)}>
        <DialogTitle>Please enter details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Expiration Date: <TextField type="date" value={selectedDate.toString()} onChange={(e) => setSelectedDate(e.target.value)} InputProps={{ inputProps: { format: "dd.MM.yyyy" } }} /><br />
            Description: <TextField type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddFoodDialogOpen(false)}>Cancel</Button>
          <Button onClick={() => {
            addFoodDialogSubmit();
            setAddFoodDialogOpen(false);
          }}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
    <div className="details">

    </div>
  </DndProvider>;
};

export default App;
