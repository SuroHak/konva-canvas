import React from "react";
import CanvasTextPath from "./CanvasTextPath";
import ReactKonvaTextPath from "./ReactKonvaTextPath";
import KonvaTextPath from "./KonvaTextPath";

const TextPath = () => (
    <div className="canvases-container">
        <CanvasTextPath />
        <ReactKonvaTextPath />
        <KonvaTextPath />
    </div>
);

export default TextPath;
