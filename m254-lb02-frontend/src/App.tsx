import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, ListItem, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import api from "./api";
import "./App.css";
import FoodItem from "./FoodItem";
import Fridge from "./Fridge";
import { FoodItem as FoodItemType } from "./types";

const uuid = require("react-uuid");

const App = () => {
	const [draggedFoodItem, setDraggedFoodItem] = useState<FoodItemType>();
	const [fridgeContent, setFridgeContent] = useState<FoodItemType[]>([]);
	const [addFoodDialogOpen, setAddFoodDialogOpen] = useState(false);
	const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
	const [description, setDescription] = useState("");

	const putInFridge = () => {
		if (draggedFoodItem) {
			setSelectedDate(new Date().toISOString().split("T")[0]);
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
		api.getInventory().then(setFridgeContent);
	}, []);

	return <DndProvider backend={HTML5Backend}>
		<div className="store">
			{["carrots", "cheese", "milk"].map(foodItem => <FoodItem key={foodItem} type={foodItem as "carrots" | "cheese" | "milk"} draggingCallback={() => setDraggedFoodItem({
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
			<List>
				{fridgeContent.filter(foodItem => foodItem.expirationDate).sort((a, b) => a.expirationDate && b.expirationDate ? new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime() : 0).map(foodItem => <ListItem>
					<ListItem style={{ border: "black 2px solid" }}>
						<span style={{ position: "relative", marginTop: "-50%", fontSize: 30 }}>{foodItem.type.toUpperCase()}</span>
						<svg style={{ position: "relative", marginTop: "10%", marginLeft: "-10%" }} version="1.1" xmlns="http://www.w3.org/2000/svg" width="100" height="50" viewBox="0 0 100 50">
							<path d="M0 25 L100 25" stroke="black" strokeWidth={2} />
						</svg>
						<span style={{ position: "relative", textDecorationLine: "underline", textUnderlineOffset: 10 }}>{` ${foodItem.description}`}</span>
						<span style={{ height: "100%", marginTop: "50%", transform: "translateY(-50%)" }}>{foodItem.expirationDate}</span>
					</ListItem>
				</ListItem>)}
			</List>
		</div>
	</DndProvider>;
};

export default App;
