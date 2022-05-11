import React, { useEffect, useRef } from "react"
import { useActions } from "../../hooks/useActions"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import Brush from "../../tools/Brush"
import "../../styles/canvas.scss"
import { updateImageReq } from "../../helpFunctions/updateImgReq"


const Canvas: React.FC = () => {

    const { canvas: {canvasEl, updates, idPaint} } = useTypedSelector(state => state)
    const { actionAddCanvas, actionAddTool, actionAddUpdateToInfoUpdates } = useActions()
    const canvasRef = useRef<HTMLCanvasElement>(null)


    useEffect(() => {

        if (canvasRef.current) {
            actionAddCanvas(canvasRef.current)
        }
        
    }, [])

    


    const addInfo = (e: any) => {
        e.preventDefault()
        const canvas: HTMLCanvasElement = e.target
        const url = canvas.toDataURL()
        actionAddUpdateToInfoUpdates(url)
    }

    
    return (
        <div className="canvas">
            <canvas height={700} onMouseUp={() => updateImageReq(idPaint!, canvasEl!.toDataURL())} onMouseDown={e => addInfo(e)} width={1100} ref={canvasRef}>

            </canvas>
        </div>

    )
}

export default Canvas