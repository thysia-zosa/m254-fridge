import React, { useEffect, useRef } from "react";
import { useDrag } from "react-dnd";
import carrots from "./img/food/carrots.svg";
import cheese from "./img/food/cheese.svg";
import milk from "./img/food/milk.svg";

type FoodItemProps = {
    type: "carrots" | "cheese" | "milk",
    draggingCallback: () => void,
    isInFridge: boolean
};

const FoodItem = ({ type, draggingCallback, isInFridge }: FoodItemProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const svgs = {
        carrots,
        cheese,
        milk
    };

    const [{ isDragging }, drag] = useDrag({
        type,
        collect: monitor => ({ isDragging: monitor.isDragging() })
    });

    drag(ref);

    useEffect(() => {
        if (isDragging) draggingCallback();
    }, [isDragging]);

    return <div ref={ref} style={{ opacity: isDragging ? 0 : 1 }}>
        <img src={svgs[type]} style={{ maxHeight: type === "cheese" ? "70px" : "100px", maxWidth: "100px" }} className={isInFridge ? `${type}InFridge` : ""} />
    </div>
}

export default FoodItem;