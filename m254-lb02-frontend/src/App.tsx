import './App.css';
import FoodItem from './FoodItem';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Fridge from './Fridge';

const App = () => <DndProvider backend={HTML5Backend}>
  <div className="store">
    <FoodItem type="milk" />
  </div>
  <div className="fridge">
    <Fridge />
  </div>
  <div className="details">

  </div>
</DndProvider>

export default App;
