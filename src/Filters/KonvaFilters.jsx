import React, { useEffect, useState } from "react";
import Konva from "konva";
import {
    CANVAS_HEIGHT,
    CANVAS_WIDTH,
    IMAGE_HEIGHT,
    IMAGE_WIDTH,
    IMAGE_X,
    IMAGE_Y,
    KONVA_IMAGE_ID,
    drawEffectInKonva,
} from "../utils";

const KonvaFilters = ({ image, activeFilter, value }) => {
    const [stateStage, setStage] = useState();
    const [localActiveFilter, setLocalActiveFilter] = useState();

    useEffect(() => {
        if (!activeFilter) {
            return;
        }

        drawEffectInKonva({
            id: KONVA_IMAGE_ID,
            stage: stateStage,
            type: activeFilter,
            value,
            localActiveFilter,
            setLocalActiveFilter,
        });
    }, [activeFilter, value, localActiveFilter, stateStage]);

    useEffect(() => {
        const stage = new Konva.Stage({
            container: 'container-filters',
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT,
        });

        const layer = new Konva.Layer();

        const konvaImage = new Konva.Image({
            id: KONVA_IMAGE_ID,
            x: IMAGE_X,
            y: IMAGE_Y,
            width: IMAGE_WIDTH,
            height: IMAGE_HEIGHT,
            image,
        })
        konvaImage.cache();

        layer.add(konvaImage);
        stage.add(layer);
        stage.draw();
        setStage(stage);
     }, [image]);

    return <div id="container-filters" className="konva-container"/>;
};

export default KonvaFilters;
