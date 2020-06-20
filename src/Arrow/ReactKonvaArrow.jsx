import React from "react";
import { Stage, Layer, Arrow } from "react-konva";
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

const ReactKonvaArrow = () => {
    return (
        <div id="react-konva">
            <Stage
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
            >
                <Layer>
                    <Arrow
                        x={ARROW_X}
                        y={ARROW_Y}
                        points={ARROW_POINTS}
                        pointerLength={ARROW_POINTER_LENGTH}
                        pointerWidth={ARROW_POINTER_WIDTH}
                        fill={ARROW_FILL}
                        stroke={ARROW_STROKE}
                        strokeWidth={ARROW_STROKE_WIDTH}
                        draggable
                    />
                </Layer>
            </Stage>
        </div>
    )
};

export default ReactKonvaArrow;
