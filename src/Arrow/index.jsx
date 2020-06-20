import React from "react";
import CanvasArrow from "./CanvasArrow";
import ReactKonvaArrow from "./ReactKonvaArrow";
import KonvaArrow from "./KonvaArrow";


const Arrow = () => (
    <div className="canvases-container">
        <CanvasArrow />
        <ReactKonvaArrow />
        <KonvaArrow />
    </div>
);

export default Arrow;
