import { Socket } from "socket.io-client";
import Brush from "./Brush";
import { TypesTool } from "../types/draw/"

export default class Erases extends Brush {
    constructor(canvas: HTMLCanvasElement, id: string, socket: Socket) {
        super(canvas, id, socket)
        this.isDraw = false
        this.listen()
    }

    listen(): void {
        this.canvas.onmousedown = this.onmousedown.bind(this)
        this.canvas.onmouseup = this.onmouseup.bind(this)
        this.canvas.onmousemove = this.onmousemove.bind(this)
    }

    onmousedown(event: any): void {
        const cordX = event.pageX - event.target.offsetLeft
        const cordY = event.pageY - event.target.offsetTop
        this.isDraw = true
        this.context?.beginPath()
        this.context?.moveTo(cordX, cordY)
    }

    onmouseup(): void {
        this.socket.emit("draw", {
            id: this.id,
            tool: {
                type: TypesTool.FINISH,
            }
        })
        this.context?.beginPath()
        this.isDraw = false
    }

    onmousemove(event: any): void {
        if (this.isDraw) {
            const cordX = event.pageX - event.target.offsetLeft
            const cordY = event.pageY - event.target.offsetTop
            this.socket.emit("draw", {
                id: this.id,
                tool: {
                    type: TypesTool.ERASES,
                    x: cordX,
                    y: cordY,
                    size: this.context!.lineWidth
                }
            })
            this.draw(cordX, cordY)
        }
    }

    draw(x: number, y: number) {
        let currentColor = this.context!.fillStyle
        let currentColorStroke = this.context!.strokeStyle
        this.context!.strokeStyle = "white"
        this.context!.fillStyle = "white"
        this.context?.lineTo(x, y)
        this.context?.stroke()
        this.context!.strokeStyle = currentColorStroke
        this.context!.fillStyle = currentColor
    }

    static drawStatic(context: CanvasRenderingContext2D, x: number, y: number, currentColorFill: string | CanvasGradient | CanvasPattern, currentColorStroke: string | CanvasGradient | CanvasPattern, size: number){
        let currentColorFillWait = currentColorFill
        let currentColorStrokeWait = currentColorStroke
        const currentSize = context.lineWidth
        context.strokeStyle = "white"
        context.fillStyle = "white"
        context.lineWidth = size
        context.lineTo(x, y)
        context.stroke()
        context.strokeStyle = currentColorStrokeWait
        context.fillStyle = currentColorFillWait
        context.lineWidth = currentSize
    }
}