import React, { useEffect, useRef, useState } from "react";
import fridge from "./img/fridge.svg";
import { useDrop } from "react-dnd";
import { FridgeProps } from "./types";

const Fridge = ({ draggedFoodItem, dropCallback }: FridgeProps) => {
    const ref = useRef<HTMLDivElement>(null);

    const [{ dropResult }, drop] = useDrop({
        accept: ["carrots", "cheese", "milk"],
        collect: monitor => ({ dropResult: monitor.didDrop() })
    });

    useEffect(() => {
        if (dropResult && draggedFoodItem) {
            dropCallback();
        }
    }, [dropResult, draggedFoodItem]);

    drop(ref);

    return <div ref={ref}>
        <img src={fridge} style={{ maxWidth: "28vw", maxHeight: "96vh", transform: "translateY(-50%)", position: "absolute", top: "50%" }} />
    </div>
}

export default Fridge;