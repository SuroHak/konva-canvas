import React, { useEffect, useRef } from "react";
import setupEventListeners from "./setupEventListeners";


const CanvasDraggable = () => {
    const canvasRef = useRef();

    useEffect(() => setupEventListeners(canvasRef.current), [])

    return (
        <div>
            <h1>Base Canvas</h1>
            <canvas ref={canvasRef} id="canvas" />
        </div>
    )
};

export default CanvasDraggable;
