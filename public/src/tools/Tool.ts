import { Socket } from "socket.io-client"

export default class Tool {
    canvas: HTMLCanvasElement
    context: CanvasRenderingContext2D | null
    id: string
    socket: Socket

    constructor(canvas: HTMLCanvasElement, id: string, socket: Socket) {
        this.canvas = canvas
        this.context = canvas.getContext("2d")
        this.id = id
        this.socket = socket
    }

    set setFillStyle(color: string) {
        this.context!.fillStyle = color
    }

     set setStrokeStyle(color: string) {
        this.context!.strokeStyle = color
    }

    set setSize(size: number) {
        // debugger
        this.context!.lineWidth = size
    }

    clearListens(): void {
        this.canvas.onmousedown = null
        this.canvas.onmouseup = null
        this.canvas.onmousemove = null
    }


}