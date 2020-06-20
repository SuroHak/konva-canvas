import React, { useEffect, useRef } from "react";
import { CANVAS_HEIGHT, CANVAS_WIDTH, RING_FILL } from "../utils";

const CanvasRing = () => {
    const canvasRef = useRef();

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }

        const canvas = canvasRef.current;
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;


        const ctx = canvas.getContext('2d');
        ctx.lineWidth = 30;
        ctx.strokeStyle = RING_FILL;

        ctx.beginPath();
        ctx.arc(100, 100, 54, 0, Math.PI * 2, true);
        ctx.stroke();
    }, [])

    return <canvas ref={canvasRef} id="canvas" />;
};

export default CanvasRing;
