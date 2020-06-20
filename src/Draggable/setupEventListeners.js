import {
    CANVAS_HEIGHT,
    CANVAS_WIDTH,
    DRAGGABLE_RECT_FILL,
    DRAGGABLE_RECT_HEIGHT,
    DRAGGABLE_RECT_WIDTH
} from "../utils";

const draggableRect = {
    x: 0,
    y: 0,
    width: DRAGGABLE_RECT_WIDTH,
    height: DRAGGABLE_RECT_HEIGHT,
    fill: DRAGGABLE_RECT_FILL,
}

let oldX;
let oldY;
let isDrag = false;
let diffX = draggableRect.x;
let diffY = draggableRect.y;

const canvasMouseDown = e => {
    if (!(e.layerX > draggableRect.x && e.layerY > draggableRect.y &&
        e.layerX < draggableRect.x + draggableRect.width &&
        e.layerY < draggableRect.y + draggableRect.height
    )) {
        return;
    }

    isDrag = true;
    oldX = e.layerX;
    oldY = e.layerY;
};

const canvasMouseMove = e => {
    if (!isDrag) {
        return;
    }

    const ctx = e.target.getContext('2d');

    ctx.clearRect(diffX, diffY, draggableRect.width, draggableRect.height);

    diffX = draggableRect.x + e.layerX - oldX;
    diffY = draggableRect.y + e.layerY - oldY;

    ctx.fillRect(diffX, diffY, draggableRect.width, draggableRect.height);
};

const canvasMouseUp = () => {
    isDrag = false;
    draggableRect.x = diffX;
    draggableRect.y = diffY;
};

const setupEventListeners = (canvas) => {
    if (!canvas) {
        return;
    }

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    const ctx = canvas.getContext('2d');

    ctx.fillStyle = draggableRect.fill;
    ctx.fillRect(draggableRect.x, draggableRect.y, draggableRect.width, draggableRect.height);

    canvas.addEventListener('mousedown', canvasMouseDown);
    canvas.addEventListener('mousemove', canvasMouseMove);
    canvas.addEventListener('mouseup', canvasMouseUp);

    return () => {
        canvas.removeEventListener('mousedown', canvasMouseDown);
        canvas.removeEventListener('mousemove', canvasMouseMove);
        canvas.removeEventListener('mouseup', canvasMouseUp);
    }
};

export default setupEventListeners;
