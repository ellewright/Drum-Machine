import crash from "../assets/crash.wav"
import hiHat from "../assets/hiHat.wav"
import kick from "../assets/kick.wav"
import openHat from "../assets/openHat.wav"
import snare from "../assets/snare.wav"

const ROWS = 5
const COLS = 16

let FPS = 60
const FRAMES_PER_MINUTE = FPS * 60

const CELL_SIZE = 25
const OFFSET = 25

const LIGHT_GRAY = "#999"
const GREEN = "#22c55e"

const FONT = "sans-serif"

let x = 0
let y = 0

let bpm = 240
let framesPerBeat = FRAMES_PER_MINUTE / bpm
let currentFrame = 0
let currentPos = 0

const notesPlayed = Array.from({
    length: ROWS
}, () => Array(COLS).fill(0))

export function draw(context) {
    currentFrame++
    drawBoard(context)
    playSounds()
}

export function drawBoard(context) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height)

    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            const cellX = c * CELL_SIZE + OFFSET
            const cellY = r * CELL_SIZE + OFFSET

            context.strokeStyle = "black"
            context.strokeRect(cellX, cellY, CELL_SIZE, CELL_SIZE)

            if (notesPlayed[r][c] === 1) {
                context.fillStyle = GREEN
                context.fillRect(cellX, cellY, CELL_SIZE, CELL_SIZE)
            }
        }
    }

    context.fillStyle = LIGHT_GRAY
    context.font = `20px ${FONT}`
    context.fillText("Crash", 430, 45)
    context.fillText("Open Hat", 430, 70)
    context.fillText("Closed Hat", 430, 95)
    context.fillText("Snare", 430, 120)
    context.fillText("Kick", 430, 145)
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

export function playSound(src) {
    let sound = new Audio(src)
    sound.play()
}

export function playSounds() {
    if (currentFrame % framesPerBeat === 0) {
        currentPos++
        if (currentPos >= notesPlayed[0].length) {
            currentPos = 0
        }

        for (let r = 0; r < ROWS; r++) {
            if (notesPlayed[r][currentPos] === 1) {
                let src = ""
                switch (r) {
                    case 0:
                        src = crash
                        break
                    case 1:
                        src = openHat
                        break
                    case 2:
                        src = hiHat
                        break
                    case 3:
                        src = snare
                        break
                    case 4:
                        src = kick
                        break
                }

                playSound(src)
            }
        }
    }
}