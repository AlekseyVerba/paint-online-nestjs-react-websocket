import { Socket } from "socket.io-client"
import { TypesTool } from "../types/draw"
import Tool from "./Tool"

export default class Line extends Tool {

    isDraw: boolean
    saved: any
    currentX: number
    currentY: number

    constructor(canvas: HTMLCanvasElement, id: string, socket: Socket) {
        super(canvas, id, socket)
        this.isDraw = false
        this.listen()
        this.currentX = 0
        this.currentY = 0
    }

    listen(): void {
        this.canvas.onmousedown = this.onmousedown.bind(this)
        this.canvas.onmouseup = this.onmouseup.bind(this)
        this.canvas.onmousemove = this.onmousemove.bind(this)
    }

    onmousedown(event: any): void {
        this.currentX = event.pageX - event.target.offsetLeft
        this.currentY = event.pageY - event.target.offsetTop
        this.isDraw = true
        this.context?.beginPath()
        this.context?.moveTo(this.currentX, this.currentY)
        this.saved = this.canvas.toDataURL()
    }

    onmouseup(event: any): void {
        this.isDraw = false
        this.socket.emit("draw", {
            id: this.id,
            tool: {
                type: TypesTool.LINE,
                startX: this.currentX,
                startY: this.currentY,
                endX: event.pageX - event.target.offsetLeft,
                endY: event.pageY - event.target.offsetTop,
                strokeColor: this.context?.strokeStyle,
                fillColor: this.context?.fillStyle,
                size: this.context!.lineWidth
            }
        })
        this.context?.beginPath()
    }

    onmousemove(event: any): void {
        if (this.isDraw) {
            const cordX = event.pageX - event.target.offsetLeft
            const cordY = event.pageY - event.target.offsetTop
            this.draw(cordX, cordY)
        }
    }

    draw(x: number, y: number) {
        const img = new Image()
        img.src = this.saved
        img.onload = () => {
            this.context!.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.context!.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.context!.beginPath()
            this.context!.moveTo(this.currentX, this.currentY)
            this.context!.lineTo(x, y)
            this.context!.stroke()
        }
        this.context?.lineTo(x, y)
        this.context?.fill()
    }

    static drawStatic(context: CanvasRenderingContext2D, startX: number, startY: number, endX: number, endY: number, strokeColor: string | CanvasGradient | CanvasPattern, size: number) {
        const currentColor = context.strokeStyle
        const currentSize = context.lineWidth
        context!.beginPath()
        context.moveTo(startX, startY)
        context.strokeStyle = strokeColor
        context.lineWidth = size
        context!.lineTo(endX, endY)
        context!.stroke()
        context.strokeStyle = currentColor
        context.lineWidth = currentSize
    }

}