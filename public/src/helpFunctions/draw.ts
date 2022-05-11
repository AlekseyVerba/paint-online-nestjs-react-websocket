import { IDraw, TypesTool } from "../types/draw"
import Brush from "../tools/Brush"
import Rect from "../tools/React"
import Erases from "../tools/Erases"
import Circle from "../tools/Circle"
import Line from "../tools/Line"


export const draw = (data: IDraw, context: CanvasRenderingContext2D | null) => {
    switch(data.tool.type) {
        case TypesTool.BRUSH: {
            Brush.draw(context!, data.tool.x, data.tool.y, data.tool.strokeColor, data.tool.fillColor, data.tool.size)
            break
        }

        case TypesTool.ERASES: {
            Erases.drawStatic(context!, data.tool.x, data.tool.y, context!.fillStyle, context!.strokeStyle, data.tool.size)
            break;
        }

        case TypesTool.FINISH: {
            
            context?.beginPath()
            break
        }

        case TypesTool.RECT: {
            context?.beginPath()
            Rect.staticDraw(context!, data.tool.x, data.tool.y, data.tool.height, data.tool.width, data.tool.fillColor)
            break
        }

        case TypesTool.CIRCLE: {
            context?.beginPath()
            Circle.drawStatic(context!, data.tool.x, data.tool.y, data.tool.radius, data.tool.strokeColor, data.tool.fillColor)
            break
        }

        case TypesTool.LINE: {
            context?.beginPath()
            Line.drawStatic(context!, data.tool.startX, data.tool.startY, data.tool.endX, data.tool.endY, data.tool.strokeColor, data.tool.size)
            break
        }

    }
}