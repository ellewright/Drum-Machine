import { useEffect } from "react"

const WIDTH = 800
const HEIGHT = 600

const ROWS = 5
const COLS = 16
const CELL_SIZE = 25
const OFFSET = 25

let x = 0
let y = 0

const notesPlayed = Array.from({
    length: ROWS
}, () => Array(COLS).fill(0))

function draw(context) {
    drawBoard(context)
}

function drawBoard(context) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height)

    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            const cellX = c * CELL_SIZE + OFFSET
            const cellY = r * CELL_SIZE + OFFSET

            context.strokeStyle = "black"
            context.strokeRect(cellX, cellY, CELL_SIZE, CELL_SIZE)

            if (notesPlayed[r][c] === 1) {
                context.fillStyle = "green"
                context.fillRect(cellX, cellY, CELL_SIZE, CELL_SIZE)
            }
        }
    }
}

function getPosition(e, canvas) {
    x = e.clientX - canvas.offsetLeft
    y = e.clientY - canvas.offsetTop
}

function collision(context) {
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            const cellX = c * CELL_SIZE + OFFSET
            const cellY = r * CELL_SIZE + OFFSET

            if (x >= cellX && x < cellX + CELL_SIZE && y >= cellY && y < cellY + CELL_SIZE) {
                notesPlayed[r][c] = notesPlayed[r][c] === 1 ? 0 : 1
                draw(context)
                return
            }
        }
    }
}

export default function Board() {

    useEffect(() => {
        const canvas = document.getElementById("myCanvas")
        const context = canvas.getContext("2d")
        canvas.addEventListener("mousedown", (e) => {
            getPosition(e, canvas)
            collision(context)
        }, false)

        draw(context)

        return () => {
            canvas.removeEventListener("mousedown", getPosition)
        }
    }, [])

    return (
        <canvas id="myCanvas" width={`${WIDTH}`} height={`${HEIGHT}`}></canvas>
    )
}