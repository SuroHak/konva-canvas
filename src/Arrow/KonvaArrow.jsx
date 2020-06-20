import React, { useEffect } from "react";
import Konva from "konva";
import {
    ARROW_FILL,
    ARROW_POINTER_LENGTH,
    ARROW_POINTER_WIDTH,
    ARROW_POINTS,
    ARROW_STROKE,
    ARROW_STROKE_WIDTH,
    ARROW_X,
    ARROW_Y,
    CANVAS_HEIGHT,
    CANVAS_WIDTH,
} from "../utils";

const KonvaArrow = () => {

    useEffect(() => {
        const stage = new Konva.Stage({
            container: 'container-arrow',
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT,
        });

        const layer = new Konva.Layer();

        const arrow = new Konva.Arrow({
            x: ARROW_X,
            y: ARROW_Y,
            points: ARROW_POINTS,
            pointerLength: ARROW_POINTER_LENGTH,
            pointerWidth: ARROW_POINTER_WIDTH,
            fill: ARROW_FILL,
            stroke: ARROW_STROKE,
            strokeWidth: ARROW_STROKE_WIDTH,
            draggable: true,
        })

        layer.add(arrow);
        stage.add(layer);

        stage.draw()
    }, []);

    return <div id="container-arrow" className="konva-container"/>;
};

export default KonvaArrow;
