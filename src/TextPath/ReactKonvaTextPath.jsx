import React from "react";
import { Stage, Layer, TextPath } from "react-konva";
import {
    CANVAS_HEIGHT,
    CANVAS_WIDTH,
    TEXT_PATH_DATA,
    TEXT_PATH_FILL, TEXT_PATH_FONT_SIZE,
    TEXT_PATH_TEXT,
    TEXT_PATH_X,
    TEXT_PATH_Y
} from "../utils";

const ReactKonvaTextPath = () => {
    return (
        <div id="react-konva">
            <Stage
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
            >
                <Layer>
                    <TextPath
                        x={TEXT_PATH_X}
                        y={TEXT_PATH_Y}
                        fontSize={TEXT_PATH_FONT_SIZE}
                        fill={TEXT_PATH_FILL}
                        text={TEXT_PATH_TEXT}
                        data={TEXT_PATH_DATA}
                        draggable
                    />
                </Layer>
            </Stage>
        </div>
    )
};

export default ReactKonvaTextPath;
