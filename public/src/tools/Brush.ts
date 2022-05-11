import { Socket } from "socket.io-client"
import Tool from "./Tool"
import { updateImageReq } from "../helpFunctions/updateImgReq"

export default class Brush extends Tool {

    isDraw: boolean

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
                type: "finish",
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
                    type: "brush",
                    x: cordX,
                    y: cordY,
                    strokeColor: this.context?.strokeStyle,
                    fillColor: this.context?.fillStyle,
                    size: this.context!.lineWidth
                }
            })
            this.drawNoStatic(cordX, cordY)
        }
    }

    drawNoStatic(x: number, y: number) {
        this.context!.lineTo(x, y)
        this.context?.stroke()
    }

    static draw(context: CanvasRenderingContext2D, x: number, y: number, strokeColor: string | CanvasGradient | CanvasPattern, fillColor: string | CanvasGradient | CanvasPattern, size: number) {
        const currentColor = context.strokeStyle
        const currentSize = context.lineWidth
        context.lineTo(x, y)
        context.strokeStyle = strokeColor
        context.lineWidth = size
        context.stroke()
        context.strokeStyle = currentColor
        context.lineWidth = currentSize
    }

}