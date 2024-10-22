import { useEffect } from 'react'

// const FPS = 60

const WIDTH = 800
const HEIGHT = 600

const ROWS = 5
const COLS = 16
const CELL_SIZE = 25
const OFFSET = 25

let x = 0
let y = 0

const notesPlayed = []

for (let r = 0; r < ROWS; r++) {
    notesPlayed[r] = []
    for (let c = 0; c < COLS; c++) {
        notesPlayed[r][c] = 0
    }
}

function draw(context) {
    requestAnimationFrame(() => draw(context))
    drawBoard(context)
    collision(context)
}

function drawBoard(context) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height)

    for (let r = 0; r <= ROWS; r++) {
        for (let c = 0; c <= COLS; c++) {

            context.strokeStyle = "black"
            context.beginPath()
            context.moveTo(OFFSET + c * CELL_SIZE, OFFSET)
            context.lineTo(OFFSET + c * CELL_SIZE, OFFSET + ROWS * CELL_SIZE)
            context.stroke()

            context.beginPath()
            context.moveTo(OFFSET, OFFSET + r * CELL_SIZE)
            context.lineTo(OFFSET + COLS * CELL_SIZE, OFFSET + r * CELL_SIZE)
            context.stroke()
        }
    }

    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            if (notesPlayed[r][c] === 1) {
                context.fillStyle = "green"
                context.fillRect(OFFSET + r * CELL_SIZE, OFFSET + c * CELL_SIZE, CELL_SIZE, CELL_SIZE)
            }
        }
    }
}

function getPosition(e, canvas) {
    x = e.x - canvas.offsetLeft
    y = e.y - canvas.offsetTop
}

function collision(context) {
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            const cellX = r * CELL_SIZE + OFFSET
            const cellY = c * CELL_SIZE + OFFSET

            if (x >= cellX && x < cellX + CELL_SIZE && y >= cellY && y < cellY + CELL_SIZE) {
                const isPlayed = notesPlayed[r][c] === 1
                const color = isPlayed ? "white" : "green"

                context.beginPath()
                context.fillStyle = color
                context.fillRect(cellX, cellY, CELL_SIZE, CELL_SIZE)

                notesPlayed[r][c] = isPlayed ? 0 : 1
                x = -1
                y = -1
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
            cancelAnimationFrame(draw)
        }
    }, [])

    return (
        <canvas id="myCanvas" width={`${WIDTH}`} height={`${HEIGHT}`}></canvas>
    )
}