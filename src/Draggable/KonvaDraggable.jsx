import React, { useEffect } from "react";
import Konva from "konva";
import {
    CANVAS_HEIGHT,
    CANVAS_WIDTH,
    DRAGGABLE_RECT_FILL,
    DRAGGABLE_RECT_HEIGHT,
    DRAGGABLE_RECT_WIDTH
} from "../utils";

const KonvaDraggable = () => {

    useEffect(() => {
        const stage = new Konva.Stage({
            container: 'container-draggable',
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT,
        });

        const layer = new Konva.Layer();

        const rect = new Konva.Rect({
            width: DRAGGABLE_RECT_WIDTH,
            height: DRAGGABLE_RECT_HEIGHT,
            fill: DRAGGABLE_RECT_FILL,
            draggable: true,
        });

        layer.add(rect);
        stage.add(layer);

        stage.draw()
    }, []);

    return (
        <div>
            <h1>Konva</h1>
            <div id="container-draggable" className="konva-container"/>
        </div>
    )
};

export default KonvaDraggable;
