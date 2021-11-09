import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, List, ListItem, TextField } from "@material-ui/core";
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
	const [updateFoodDialogOpen, setUpdateFoodDialogOpen] = useState(false);
	const [selectedFoodItem, setSelectedFoodItem] = useState<FoodItemType>();
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
			api.addFoodItem({ ...draggedFoodItem, expirationDate: selectedDate, description }).then(() => {
				setFridgeContent(prev => [...prev, { ...draggedFoodItem, expirationDate: selectedDate, description }]);
				setDraggedFoodItem(undefined);
			});
		}
	}

	const updateFoodItem = () => {
		if (selectedFoodItem) api.updateFoodItem(selectedFoodItem).then(() => api.getInventory().then(setFridgeContent));
	}

	const deleteFoodItem = () => {
		if (selectedFoodItem) api.deleteFoodItem(selectedFoodItem.id).then(() => setFridgeContent(fridgeContent.filter(foodItem => foodItem.id !== selectedFoodItem.id)));
	}

	useEffect(() => {
		api.getInventory().then(res => {
			console.log(res);
			setFridgeContent(res);
		});
	}, []);

	return <DndProvider backend={HTML5Backend}>
		<div className="store">
			{["carrots", "cheese", "milk"].map(foodItem => <FoodItem key={foodItem} type={foodItem as "carrots" | "cheese" | "milk"} draggingCallback={() => setDraggedFoodItem({
				id: uuid(),
				type: foodItem,
				expirationDate: selectedDate,
				description: description
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
			<Dialog open={updateFoodDialogOpen} onClose={() => setUpdateFoodDialogOpen(false)}>
				<DialogTitle>Please enter updated details</DialogTitle>
				<DialogContent>
					<DialogContentText>
						{console.log(selectedFoodItem?.expirationDate)}
						Expiration Date: <TextField type="date" value={selectedFoodItem?.expirationDate} onChange={(e) => {
							if (selectedFoodItem) setSelectedFoodItem({ ...selectedFoodItem, expirationDate: e.target.value });
						}} InputProps={{ inputProps: { format: "dd.MM.yyyy" } }} /><br />
						Description: <TextField type="text" value={selectedFoodItem?.description} onChange={(e) => {
							if (selectedFoodItem) setSelectedFoodItem({ ...selectedFoodItem, description: e.target.value });
						}} />
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => {
						deleteFoodItem();
						setUpdateFoodDialogOpen(false);
					}}>Delete</Button>
					<Button onClick={() => setUpdateFoodDialogOpen(false)}>Cancel</Button>
					<Button onClick={() => {
						updateFoodItem();
						setUpdateFoodDialogOpen(false);
					}}>Submit</Button>
				</DialogActions>
			</Dialog>
		</div>
		<div className="details">
			<List style={{ overflow: "auto", maxHeight: "95%" }}>
				{fridgeContent.filter(foodItem => foodItem.expirationDate).sort((a, b) => a.expirationDate && b.expirationDate ? new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime() : 0).map(foodItem => <ListItem>
					<ListItem id={foodItem.id} style={{ border: "black 2px solid", cursor: "pointer", backgroundColor: foodItem.expirationDate && (new Date(foodItem.expirationDate).getTime() - new Date().getTime() <= 260000000) ? "#FFEEEE" : "#FFFFFF" }} onMouseOver={() => (document.getElementById(foodItem.id) as HTMLElement).style.backgroundColor = foodItem.expirationDate && (new Date(foodItem.expirationDate).getTime() - new Date().getTime() <= 260000000) ? "#EEDDDD" : "#EEEEEE"} onMouseLeave={() => (document.getElementById(foodItem.id) as HTMLElement).style.backgroundColor = foodItem.expirationDate && (new Date(foodItem.expirationDate).getTime() - new Date().getTime() <= 260000000) ? "#FFEEEE" : "#FFFFFF"} onClick={() => {
						setSelectedFoodItem(foodItem);
						setUpdateFoodDialogOpen(true);
					}}>
						<Grid container>
							<Grid item xs={12}>
								<span style={{ position: "relative", marginTop: "-50%", fontSize: 30 }}>{foodItem.type.toUpperCase()}</span>
							</Grid>
							<Grid item xs={12}>{foodItem.description}</Grid>
							{foodItem.expirationDate && <span style={{ height: "100%", marginTop: "5%", marginLeft: "80%" }}>{((date = new Date(foodItem.expirationDate)) => `${date.getDate()}.`.padStart(3, '0') + `${date.getMonth() + 1}.`.padStart(3, '0') + date.getFullYear())()}</span>}
						</Grid>
					</ListItem>
				</ListItem>)}
			</List>
		</div>
	</DndProvider>;
};

export default App;
