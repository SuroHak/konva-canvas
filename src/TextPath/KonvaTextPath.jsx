import React, { useEffect } from "react";
import Konva from "konva";
import {
    CANVAS_HEIGHT,
    CANVAS_WIDTH,
    TEXT_PATH_DATA,
    TEXT_PATH_FILL,
    TEXT_PATH_FONT_SIZE,
    TEXT_PATH_TEXT,
    TEXT_PATH_X,
    TEXT_PATH_Y
} from "../utils";

const KonvaTextPath = () => {

    useEffect(() => {
        const stage = new Konva.Stage({
            container: 'container-text-path',
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT,
        });

        const layer = new Konva.Layer();

        const textpath = new Konva.TextPath({
            x: TEXT_PATH_X,
            y: TEXT_PATH_Y,
            fill: TEXT_PATH_FILL,
            fontSize: TEXT_PATH_FONT_SIZE,
            text: TEXT_PATH_TEXT,
            data: TEXT_PATH_DATA,
            draggable: true,
        });

        layer.add(textpath);
        stage.add(layer);

        stage.draw()
    }, []);

    return <div id="container-text-path" className="konva-container" />;
};

export default KonvaTextPath;
