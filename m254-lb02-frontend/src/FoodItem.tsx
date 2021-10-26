import React, { useEffect, useRef } from "react";
import { useDrag } from "react-dnd";
import carrots from "./img/food/carrots.svg";
import cheese from "./img/food/cheese.svg";
import milk from "./img/food/milk.svg";

const FoodItem = ({ type }: { type: "carrots" | "cheese" | "milk" }) => {
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

    return <div ref={ref} style={{ opacity: isDragging ? 0 : 1 }}>
        <img src={svgs[type]} style={{ maxHeight: "100px", maxWidth: "100px" }} />
    </div>
}

export default FoodItem;