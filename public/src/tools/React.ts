import { Socket } from "socket.io-client"
import Tool from "./Tool"

export default class Rect extends Tool {

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

    onmouseup(event: any): void {
        this.isDraw = false
        this.socket.emit("draw", {
            id: this.id,
            tool: {
                type: "rect",
                x: this.startX,
                y: this.startY,
                height: this.height,
                width: this.width,
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
            this.draw(this.startX, this.startY, this.height, this.width)
        }
    }

    draw(x: number, y: number, currentX: number, currentY: number) {
        const img = new Image()
        img.src = this.saved
        img.onload = () => {
            this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.context?.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.context?.beginPath()
            this.context?.rect(x, y, currentX, currentY)
            this.context?.fill()
        }

    }

    static staticDraw(context: CanvasRenderingContext2D, x: number, y: number, currentX: number, currentY: number, fillColor: string | CanvasGradient | CanvasPattern) {
        context.beginPath()
        const currentColor = context.fillStyle
        context.rect(x, y, currentX, currentY)
        context.fillStyle = fillColor
        context.fill() 
        context.fillStyle = currentColor
    }

}