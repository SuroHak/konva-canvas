import React from "react";
import { Stage, Layer, Rect } from "react-konva";
import {
    CANVAS_HEIGHT,
    CANVAS_WIDTH,
    DRAGGABLE_RECT_FILL,
    DRAGGABLE_RECT_HEIGHT,
    DRAGGABLE_RECT_WIDTH
} from "../utils";

const ReactKonvaDraggable = () => {
    return (
        <div>
            <h1>React Konva</h1>
            <div id="react-konva">
                <Stage
                    width={CANVAS_WIDTH}
                    height={CANVAS_HEIGHT}
                >
                    <Layer>
                        <Rect
                            width={DRAGGABLE_RECT_WIDTH}
                            height={DRAGGABLE_RECT_HEIGHT}
                            fill={DRAGGABLE_RECT_FILL}
                            draggable
                        />
                    </Layer>
                </Stage>
            </div>
        </div>
    )
};

export default ReactKonvaDraggable;
