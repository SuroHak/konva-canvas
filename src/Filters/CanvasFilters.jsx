import React, { useRef, useEffect } from 'react';
import { CANVAS_HEIGHT, CANVAS_WIDTH, drawEffectInCanvas, IMAGE_HEIGHT, IMAGE_WIDTH, IMAGE_X, IMAGE_Y } from "../utils";

const CanvasFilters = ({ image, activeFilter, value }) => {
    const canvasRef = useRef();

    useEffect(() => {
        if (!activeFilter) {
            return;
        }

        drawEffectInCanvas({
            type: activeFilter,
            value,
            ctx: canvasRef.current.getContext('2d'),
            image
        });
    }, [activeFilter, value, image]);

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }

        const canvas = canvasRef.current;
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, IMAGE_X, IMAGE_Y, IMAGE_WIDTH, IMAGE_HEIGHT);
    }, [image])

    return <canvas ref={canvasRef} id="canvas" />;
};

export default CanvasFilters;
