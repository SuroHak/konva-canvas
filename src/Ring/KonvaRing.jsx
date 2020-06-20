import React, { useEffect } from "react";
import Konva from "konva";
import {
    CANVAS_HEIGHT,
    CANVAS_WIDTH,
    RING_FILL,
    RING_INNER_RADIUS,
    RING_OUTER_RADIUS,
    RING_STORKE_WIDTH,
    RING_STROKE,
    RING_X,
    RING_Y
} from "../utils";

const KonvaRing = () => {

    useEffect(() => {
        const stage = new Konva.Stage({
            container: 'container-ring',
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT,
        });

        const layer = new Konva.Layer();

        const ring = new Konva.Ring({
            x: RING_X,
            y: RING_Y,
            innerRadius: RING_INNER_RADIUS,
            outerRadius: RING_OUTER_RADIUS,
            fill: RING_FILL,
            stroke: RING_STROKE,
            strokeWidth: RING_STORKE_WIDTH,
            draggable: true,
        });

        layer.add(ring);
        stage.add(layer);

        stage.draw()
    }, []);

    return <div id="container-ring" className="konva-container"/>;
};

export default KonvaRing;
