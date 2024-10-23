import { useEffect } from "react"
import { draw, getPosition, collision } from "../functions/board"
import "./Board.css"

const WIDTH = 600
const HEIGHT = 275

export default function Board() {
    useEffect(() => {
        const canvas = document.getElementById("myCanvas")
        const context = canvas.getContext("2d")

        function gameLoop() {
            draw(context)
            requestAnimationFrame(gameLoop)
        }

        canvas.addEventListener("mousedown", (e) => {
            getPosition(e, canvas)
            collision(context)
        }, false)

        gameLoop()

        return () => {
            canvas.removeEventListener("mousedown", getPosition)
        }
    }, [])

    return (
        <canvas id="myCanvas" width={`${WIDTH}`} height={`${HEIGHT}`}></canvas>
    )
}