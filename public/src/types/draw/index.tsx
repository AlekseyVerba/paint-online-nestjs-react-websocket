export interface IDraw {
    id: string
    tool: IBrush | IRect | IErases | ICircle | ILine
}


interface IBrush {
    type: TypesTool.BRUSH | TypesTool.FINISH
    x: number,
    y: number
    strokeColor: string | CanvasGradient | CanvasPattern,
    fillColor: string | CanvasGradient | CanvasPattern
    size: number
}

interface IErases {
    type: TypesTool.ERASES | TypesTool.FINISH
    x: number
    y: number
    strokeColor: string | CanvasGradient | CanvasPattern,
    fillColor: string | CanvasGradient | CanvasPattern
    size: number
}

interface IRect {
    type: TypesTool.RECT
    x: number,
    y: number,
    height: number,
    width: number
    strokeColor: string | CanvasGradient | CanvasPattern,
    fillColor: string | CanvasGradient | CanvasPattern
}

interface ICircle {
    type: TypesTool.CIRCLE
    x: number 
    y: number
    radius: number
    strokeColor: string | CanvasGradient | CanvasPattern,
    fillColor: string | CanvasGradient | CanvasPattern
}

interface ILine {
    type: TypesTool.LINE
    startX: number 
    startY: number
    endX: number
    endY: number
    strokeColor: string | CanvasGradient | CanvasPattern,
    fillColor: string | CanvasGradient | CanvasPattern
    size: number
}

export enum TypesTool {
    BRUSH = "brush",
    FINISH = "finish",
    RECT = "rect",
    ERASES = "erases",
    CIRCLE = "circle",
    LINE = "line"
}