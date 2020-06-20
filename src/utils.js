import Konva from 'konva';

// canvas
export const CANVAS_WIDTH = 300;
export const CANVAS_HEIGHT = 300;

// draggable
export const DRAGGABLE_RECT_WIDTH = 50;
export const DRAGGABLE_RECT_HEIGHT = 50;
export const DRAGGABLE_RECT_FILL = 'darkgreen';

// text-path
export const TEXT_PATH_X = 50;
export const TEXT_PATH_Y = 50;
export const TEXT_PATH_TEXT = "All the world's a stage, and all the men and women merely players.";
export const TEXT_PATH_DATA = 'M10,10 C0,0 10,150 100,100 S300,150 5.0.300';
export const TEXT_PATH_FILL = '#333';
export const TEXT_PATH_FONT_SIZE = 16;


// arrow
export const ARROW_X = 20;
export const ARROW_Y = 20;
export const ARROW_POINTS = [0, 0, 100, 100];
export const ARROW_POINTER_LENGTH = 20;
export const ARROW_POINTER_WIDTH = 20;
export const ARROW_FILL = 'red';
export const ARROW_STROKE = 'darkgreen';
export const ARROW_STROKE_WIDTH = 3;

// ring
export const RING_X = 100;
export const RING_Y = 100;
export const RING_INNER_RADIUS = 30;
export const RING_OUTER_RADIUS =  70;
export const RING_FILL = 'coral';
export const RING_STROKE = 'darkgreen';
export const RING_STORKE_WIDTH = 4;

// image
export const IMAGE_X = 0;
export const IMAGE_Y = 0;
export const IMAGE_WIDTH = 300;
export const IMAGE_HEIGHT = 300;
export const IMAGE_URl = 'https://pastatic.picsart.com/dp/item/764d59b593e3ba94128efe5ec71596ce837f8fa69575c7b9b50a23f830d613af.jpg?to=crop&r=300';
export const KONVA_IMAGE_ID = 'konva-image';
export const REACT_KONVA_IMAGE_ID = 'react-konva-image';

// slider style
export const SLIDER_STYLES = {
    trackStyle: {
        backgroundColor: 'darkgreen'
    },
    railStyle: {
        backgroundColor: 'whitesmoke'
    },
    handleStyle: {
        backgroundColor: 'cornflowerblue',
        borderColor: 'darkcyan'
    },
}

// filter buttons active style
export const BUTTONS_STYLE = {
    backgroundColor: 'darkgreen',
    color: 'whitesmoke',
    transform: 'scale(1.08)'
}

export const loadingImage = url => new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = '';
    image.src = url;

    let loadCount = 0;

    image.onload = () => {
        resolve(image);
    };

    image.onerror = () => {
        if (loadCount > 0) {
            return reject(new Error(`Could not load image at ${url}`));
        }

        loadCount++;

        image.src = url;
    };
});

export const drawEffectInKonva = ({ stage, type, value, localActiveFilter, setLocalActiveFilter, id }) => {
    const img = stage.findOne(`#${id}`);

    if (localActiveFilter !== type) {
        img.filters([]);
    }

    if (!img.filters()?.length) {
        img.filters([Konva.Filters[type]])
    }

    switch (type.toLowerCase()) {
        case 'blur':
            img.blurRadius(Math.abs(value));
            break;
        case 'brighten':
            img.brightness(value / 150);
            break;
        case 'contrast':
            img.contrast(value / 5);
            break;
        case 'enhance':
            img.enhance(value / 120);
            break;
        case 'mask':
            img.threshold(value * 2);
            break;
        case 'noise':
            img.noise(value / 120);
            break;
        case 'pixelate':
            img.pixelSize(Math.abs(value / 5));
            break;
        case 'posterize':
            img.levels(Math.abs(value / 100))
            break;
        case 'threshold':
            img.threshold(Math.abs(value / 120));
            break;
        default:
            break;
    }

    setLocalActiveFilter(type);
    stage.draw();
};

export const drawEffectInCanvas = ({ type, value, ctx, image }) => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    switch (type.toLowerCase()) {
        case 'blur':
            ctx.filter = `blur(${value / 10}px)`
            break;
        case 'brighten':
            ctx.filter = `brightness(${value / 20})`;
            break;
        case 'contrast':
            ctx.filter = `contrast(${value / 20})`;
            break;
        case 'grayscale':
            ctx.filter = `grayscale(${value + 1})`;
            break;
        case 'invert':
            ctx.filter = `invert(${value + 1})`;
            break;
        case 'sepia':
            ctx.filter = `sepia(${value + 1})`;
            break;
        default:
            break;
    }

    ctx.drawImage(image, IMAGE_X, IMAGE_Y, IMAGE_WIDTH, IMAGE_HEIGHT);
}
