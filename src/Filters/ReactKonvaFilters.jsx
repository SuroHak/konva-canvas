import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Image } from "react-konva";
import {
    CANVAS_HEIGHT,
    CANVAS_WIDTH,
    IMAGE_HEIGHT,
    IMAGE_WIDTH,
    REACT_KONVA_IMAGE_ID,
    drawEffectInKonva, IMAGE_X, IMAGE_Y,
} from "../utils";

const ReactKonvaFilters = ({ image, activeFilter, value }) => {
    const stageRef = useRef();
    const imageRef = useRef();
    const [localActiveFilter, setLocalActiveFilter] = useState();

    useEffect(() => {
        if (!activeFilter) {
            return;
        }

        drawEffectInKonva({
            id: REACT_KONVA_IMAGE_ID,
            stage: stageRef.current,
            type: activeFilter,
            value,
            localActiveFilter,
            setLocalActiveFilter,
        });
    }, [activeFilter, value, localActiveFilter]);

    useEffect(() => {
        if (!imageRef.current) {
            return;
        }
        imageRef.current.cache();
        imageRef.current.getLayer().batchDraw();
    }, []);


    return (
        <div id="react-konva">
            <Stage
                ref={stageRef}
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
            >
                <Layer>
                    <Image
                        id={REACT_KONVA_IMAGE_ID}
                        ref={imageRef}
                        x={IMAGE_X}
                        y={IMAGE_Y}
                        width={IMAGE_WIDTH}
                        height={IMAGE_HEIGHT}
                        image={image}
                    />
                </Layer>
            </Stage>
        </div>
    )
};

export default ReactKonvaFilters;
