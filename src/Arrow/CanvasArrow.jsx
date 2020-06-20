import React, { useEffect, useRef } from "react";
import { ARROW_FILL, ARROW_STROKE, ARROW_X, ARROW_Y, CANVAS_HEIGHT, CANVAS_WIDTH } from "../utils";


const CanvasArrow = () => {
    const canvasRef = useRef();

    const drawArrow = (context, fromX, fromY, toX, toY, r) => {
        let x_center = toX;
        let y_center = toY;

        let angle;
        let x;
        let y;

        context.beginPath();

        angle = Math.atan2(toY - fromY, toX - fromX);

        for (let i = 0; i < 3; i++) {
            angle += (1 / 3) * (2 * Math.PI);
            x = r * Math.cos(angle) + x_center;
            y = r * Math.sin(angle) + y_center;

            i === 0 ? context.moveTo(x, y) : context.lineTo(x, y);
        }

        context.closePath();
        context.fill();
    }

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }

        const canvas = canvasRef.current;
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;

        const ctx = canvas.getContext('2d');

        ctx.lineWidth = 4;
        ctx.strokeStyle = ARROW_STROKE;
        ctx.fillStyle = ARROW_FILL; // for the triangle fill
        ctx.lineJoin = 'butt';

        ctx.beginPath();
        ctx.moveTo(ARROW_X, ARROW_Y);
        ctx.lineTo(100, 100);
        ctx.stroke();


        drawArrow(ctx, ARROW_X, ARROW_Y, 100, 100, 10);
    }, [])

    return <canvas ref={canvasRef} id="canvas" />;
};

export default CanvasArrow;
