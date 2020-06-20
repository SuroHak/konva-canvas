import React, { useEffect, useState } from 'react';
import Slider from 'rc-slider'
import CanvasFilters from "./CanvasFilters";
import ReactKonvaFilters from "./ReactKonvaFilters";
import KonvaFilters from "./KonvaFilters";
import { BUTTONS_STYLE, IMAGE_URl, loadingImage, SLIDER_STYLES } from "../utils";
import { filtersData, slidersData } from "./data";
import 'rc-slider/assets/index.css';

const Filters = () => {
    const [image, setImage] = useState(null);
    const [activeFilter, setActiveFilter] = useState();
    const [inputValues, setInputValues] = useState({ canvas: 0, react_konva: 0, konva: 0 });

    useEffect(() => {
        (async () => {
            const loadedImage = await loadingImage(IMAGE_URl);
            setImage(loadedImage);
        })();
    }, []);

    return image ? (
        <div>
            <div className="filter-types">
                {filtersData.map(el => (
                    <button
                        key={el.id}
                        className="filter-btns"
                        style={activeFilter === el.name ? BUTTONS_STYLE : {}}
                        onClick={() => setActiveFilter(el.name)}
                    >{el.name}</button>

                ))}
            </div>
            <div className="filter-sliders">
                {slidersData.map(el => (
                    <div key={el.id} className="filter-slider">
                        <Slider
                            min={0}
                            max={100}
                            value={inputValues[el.type]}
                            step={1}
                            onChange={(value) => setInputValues({ ...inputValues, [el.type]: value })}
                            {...SLIDER_STYLES}
                        />
                        <div className="inp-value-text">{inputValues[el.type]}</div>
                    </div>
                ))}
            </div>
            <div className="canvases-container">
                <CanvasFilters
                    image={image}
                    activeFilter={activeFilter}
                    value={inputValues.canvas}
                />
                <ReactKonvaFilters
                    image={image}
                    activeFilter={activeFilter}
                    value={inputValues.react_konva}
                />
                <KonvaFilters
                    image={image}
                    activeFilter={activeFilter}
                    value={inputValues.konva}
                />
            </div>
        </div>
    ) : null;
}

export default Filters;
