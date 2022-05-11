import { Socket } from "socket.io-client";
import Tool from "./Tool";
import { TypesTool } from "../types/draw" 

export default class Circle extends Tool {

    isDraw: boolean
    startX: number
    startY: number
    saved: any
    height: number
    width: number

    constructor(canvas: HTMLCanvasElement, id: string, socket: Socket) {
        super(canvas, id, socket)
        this.isDraw = false
        this.startX = 0
        this.startY = 0
        this.height = 0
        this.width = 0
        this.listen()
    }


    listen(): void {
        this.canvas.onmousedown = this.onmousedown.bind(this)
        this.canvas.onmouseup = this.onmouseup.bind(this)
        this.canvas.onmousemove = this.onmousemove.bind(this)
    }

    onmousedown(event: any): void {
      this.context?.beginPath()
      this.isDraw = true
      this.startX = event.pageX - event.target.offsetLeft
      this.startY = event.pageY - event.target.offsetTop
      this.saved = this.canvas.toDataURL()
    }

    onmouseup(): void {
        this.isDraw = false
        this.socket.emit("draw", {
            id: this.id,
            tool: {
                type: TypesTool.CIRCLE,
                x: this.startX,
                y: this.startY,
                radius: this.getRadius(this.width, this.height),
                strokeColor: this.context?.strokeStyle,
                fillColor: this.context?.fillStyle
            }
        })
        this.socket.emit("draw", {
            id: this.id,
            tool: {
                type: "finish",
            }
        })
        this.context?.beginPath()
    }

    onmousemove(event: any): void {
        if (this.isDraw) {
            const currentX = event.pageX - event.target.offsetLeft
            const currentY = event.pageY - event.target.offsetTop
            this.height = currentX - this.startX
            this.width = currentY - this.startY
            console.log(this.getRadius(this.width, this.height))
            this.draw(this.startX, this.startY, Math.abs(this.getRadius(this.width, this.height)))
        }
    }

    draw(x: number, y: number, radius: number) {
        const img = new Image()
        img.src = this.saved
        img.onload = () => {
            this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.context?.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.context?.beginPath()
            this.context?.arc(x, y, radius, 0, 2 * Math.PI)
            this.context?.fill()
        }

    }

    static drawStatic(context: CanvasRenderingContext2D ,x: number, y: number, radius: number, strokeColor: string | CanvasGradient | CanvasPattern, fillColor: string | CanvasGradient | CanvasPattern) {
        context.beginPath()
        const currentColor = context.fillStyle
        context.arc(x, y, radius, 0, 2 * Math.PI)
        context.fillStyle = fillColor
        context.fill()
        context.fillStyle = currentColor
    }

    getRadius(width: number, height: number): number {
        return width/2 + height^2/(8*width)
    }
}

