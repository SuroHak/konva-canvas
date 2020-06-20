import React from "react";
import CanvasRing from "./CanvasRing";
import ReactKonvaRing from "./ReactKonvaRing";
import KonvaRing from "./KonvaRing";

const Ring = () => (
    <div className="canvases-container">
        <CanvasRing />
        <ReactKonvaRing />
        <KonvaRing />
    </div>
);

export default Ring;
