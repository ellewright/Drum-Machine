import { useEffect } from 'react';

const ROWS = 5;
const COLS = 16;
const CELL_SIZE = 25;
const OFFSET = 25;

function draw() {
    const canvas = document.getElementById("myCanvas");
    const context = canvas.getContext("2d");

    for (let r = 0; r <= ROWS; r++) {
        for (let c = 0; c <= COLS; c++) {

            context.strokeStyle = "black";
            context.beginPath();
            context.moveTo(OFFSET + c * CELL_SIZE, OFFSET);
            context.lineTo(OFFSET + c * CELL_SIZE, OFFSET + ROWS * CELL_SIZE);
            context.stroke();

            context.beginPath();
            context.moveTo(OFFSET, OFFSET + r * CELL_SIZE);
            context.lineTo(OFFSET + COLS * CELL_SIZE, OFFSET + r * CELL_SIZE);
            context.stroke();
        }
    }
}

export default function Board() {

    useEffect(() => {
        draw();
    }, []);

    return (
        <canvas id="myCanvas" width="800" height="600"></canvas>
    )
}