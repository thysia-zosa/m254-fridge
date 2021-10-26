import React, { useEffect, useRef } from "react";
import fridge from "./img/fridge.svg";
import { useDrop } from "react-dnd";

const Fridge = () => {
    const ref = useRef<HTMLDivElement>(null);

    const [{ dropResult }, drop] = useDrop({
        accept: "milk",
        collect: monitor => ({ dropResult: monitor.didDrop() })
    });

    useEffect(() => {
        console.log(dropResult);
    }, [dropResult]);

    drop(ref);

    return <div ref={ref}>
        <img src={fridge} style={{ maxWidth: "28vw", maxHeight: "96vh", transform: "translateY(-50%)", position: "absolute", top: "50%" }} />
    </div>
}

export default Fridge;