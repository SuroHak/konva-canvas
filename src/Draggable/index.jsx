import React from "react";
import CanvasDraggable from "./CanvasDraggable";
import KonvaDraggable from "./KonvaDraggable";
import ReactKonvaDraggable from "./ReactKonvaDraggable";

const Draggable = () => (
    <div className="canvases-container">
        <CanvasDraggable />
        <ReactKonvaDraggable />
        <KonvaDraggable />
    </div>
);

export default Draggable;
