import crash from "../assets/crash.wav"
import hiHat from "../assets/hiHat.wav"
import kick from "../assets/kick.wav"
import openHat from "../assets/openHat.wav"
import snare from "../assets/snare.wav"

const ROWS = 5
const COLS = 16
const CELL_SIZE = 25
const OFFSET = 25

let FPS = 60
const FRAMES_PER_MINUTE = FPS * 60

const COLORS = {
    LIGHT_GRAY: "#999",
    RED: "#ef4444",
    GREEN: "#22c55e",
}

const SOUNDS = [
    new Audio(crash),
    new Audio(openHat),
    new Audio(hiHat),
    new Audio(snare),
    new Audio(kick),
]

const LABELS = [
    "Crash",
    "Open Hat",
    "Closed Hat",
    "Snare",
    "Kick"
]

const FONT = "sans-serif"

let bpm = 240
let framesPerBeat = Math.floor(FRAMES_PER_MINUTE / bpm)
let currentFrame = 0
let currentPos = 0

let x = 0
let y = 0

let isPlaying = false

const notesPlayed = Array.from({
    length: ROWS
}, () => Array(COLS).fill(0))

export function draw(context) {
    currentFrame++
    drawBoard(context)
    drawUI(context)
    if (isPlaying) {
        playSounds()
    }
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
                context.fillStyle = COLORS.GREEN
                context.fillRect(cellX, cellY, CELL_SIZE, CELL_SIZE)
            }
        }
    }

    drawLabels(context)
}

function drawLabels(context) {
    context.fillStyle = COLORS.LIGHT_GRAY
    context.font = `20px ${FONT}`

    LABELS.forEach((label, index) => {
        context.fillText(label, 430, 45 + (index * 25))
    })
}

function drawUI(context) {
    drawBpm(context)
    drawPlayPause(context)
}

function drawBpm(context) {
    context.fillStyle = COLORS.LIGHT_GRAY
    context.font = `20px ${FONT}`
    context.fillText("BPM:", 350, 200)

    context.rect(350, 220, 40, 40)
    context.stroke()

    context.font = `50px ${FONT}`
    context.fillStyle = COLORS.RED
    context.fillText("-", 362.5, 252.5)

    context.rect(520, 220, 40, 40)
    context.stroke()

    context.fillStyle = COLORS.GREEN
    context.fillText("+", 525, 257.5)

    context.fillStyle = COLORS.LIGHT_GRAY
    context.fillText(bpm / 2, 412.5, 257.5)

    handleBpmAdjust()
}

function handleBpmAdjust() {
    if (x >= 350 && x < 390 && y >= 220 && y < 260) {
        updateBpm(-10)
    } else if (x >= 520 && x < 560 && y >= 220 && y < 260) {
        updateBpm(10)
    }
}

function updateBpm(change) {
    bpm = Math.max(60, bpm + change)
    framesPerBeat = Math.floor(FRAMES_PER_MINUTE / bpm)
    x = -1
    y = -1
}

function drawPlayPause(context) {
    context.rect(25, 220, 40, 40)
    context.stroke()

    context.font = `30px ${FONT}`
    context.fillStyle = COLORS.GREEN
    context.fillText("►", 30, 250)

    context.rect(90, 220, 40, 40)
    context.stroke()

    context.font = `20px ${FONT}`
    context.fillStyle = COLORS.RED
    context.fillText("▐▐", 92.5, 246.25)

    handlePlayPause()
}

function handlePlayPause() {
    if (x >= 25 && x < 65 && y >= 220 & y < 260) {
        isPlaying = true
        x = -1
        y = -1
    } else if (x >= 90 && x < 130 && y >= 220 & y < 260) {
        isPlaying = false
        x = -1
        y = -1
    }
}

export function getPosition(e, canvas) {
    x = e.clientX - canvas.offsetLeft
    y = e.clientY - canvas.offsetTop
}

export function collision(context) {
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

function playSound(src) {
    src.play()
}

function playSounds() {
    if (currentFrame % framesPerBeat === 0) {
        currentPos = (currentPos + 1) % COLS

        notesPlayed.forEach((row, index) => {
            if (row[currentPos] === 1) {
                playSound(SOUNDS[index])
            }
        })
    }
}