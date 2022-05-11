export interface DrawDto {
    id: string
    tool: IBrush | IRect
}

interface ITool {
    type: TypesTool
}

interface IBrush extends ITool {
    x: number,
    y: number
}

interface IRect extends ITool {
    x: number,
    y: number,
    height: number,
    width: number
}

export enum TypesTool {
    BRUSH = "brush",
    FINISH = "finish",
    RECT = "rect"
}