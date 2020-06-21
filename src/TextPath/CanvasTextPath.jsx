import React, { useEffect, useRef } from "react";
import {
    CANVAS_HEIGHT,
    CANVAS_WIDTH,
    TEXT_PATH_DATA,
} from "../utils";

const CanvasTextPath = () => {
    const canvasRef = useRef();

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }

        const canvas = canvasRef.current;
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;

        const ctx = canvas.getContext('2d');
        const path = new Path2D(TEXT_PATH_DATA);
        ctx.stroke(path);

        // const parsedData = parsePathData(TEXT_PATH_DATA);
    })

    return <canvas ref={canvasRef} id="canvas" />;
};

export default CanvasTextPath;
