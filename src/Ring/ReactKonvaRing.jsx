import React from "react";
import { Stage, Layer, Ring } from "react-konva";
import {
    CANVAS_HEIGHT,
    CANVAS_WIDTH,
    RING_FILL,
    RING_INNER_RADIUS,
    RING_OUTER_RADIUS,
    RING_STORKE_WIDTH,
    RING_STROKE,
    RING_X,
    RING_Y,
} from "../utils";

const ReactKonvaRing = () => {
    return (
        <div id="react-konva">
            <Stage
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
            >
                <Layer>
                    <Ring
                        x={RING_X}
                        y={RING_Y}
                        innerRadius={RING_INNER_RADIUS}
                        outerRadius={RING_OUTER_RADIUS}
                        fill={RING_FILL}
                        stroke={RING_STROKE}
                        strokeWidth={RING_STORKE_WIDTH}
                        draggable
                    />
                </Layer>
            </Stage>
        </div>
    )
};

export default ReactKonvaRing;
