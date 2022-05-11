import React, { createElement } from "react"
import { useActions } from "../../hooks/useActions"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import Brush from "../../tools/Brush"
import Rect from "../../tools/React"
import Circle from "../../tools/Circle"
import Erases from "../../tools/Erases"
import Line from "../../tools/Line"
import "../../styles/toolbar.scss"
import { CONFIG } from "../../config"

const Toolbar: React.FC = () => {

    const { canvas: { canvasEl, socket, idPaint }, tool: { tool } } = useTypedSelector(state => state)
    const { actionAddTool, actionGoBack, actionGoNext } = useActions()

    const changeColor = (event: React.ChangeEvent<HTMLInputElement>) => {
        const color = event.target.value
        tool.setFillStyle = color
    }

    const download = async () => {
        const req = await fetch(`${CONFIG.SERVER_URL}/images/${idPaint}`)

        if (!req.ok) {
            return alert("Произошла ошибка")
        }

        const data = await req.text()

        const link = document.createElement("a")
        link.href = data
        link.download = `${idPaint}.jpg`
        link.click()
        link.remove()
    }

    return (
        <div className="toolbar">
            <div className="toolbar__left">
                <button className="toolbar__button toolbar__button--brush" onClick={() => actionAddTool(new Brush(canvasEl!, idPaint!, socket!))}></button>
                <button className="toolbar__button toolbar__button--squad" onClick={() => actionAddTool(new Rect(canvasEl!, idPaint!, socket!))}></button>
                <button className="toolbar__button toolbar__button--circle" onClick={() => actionAddTool(new Circle(canvasEl!, idPaint!, socket!))}></button>
                <button className="toolbar__button toolbar__button--eraser" onClick={() => actionAddTool(new Erases(canvasEl!, idPaint!, socket!))} ></button>
                <button className="toolbar__button toolbar__button--line" onClick={() => actionAddTool(new Line(canvasEl!, idPaint!, socket!))}></button>
                <button className="toolbar__button toolbar__button--color"></button>
                <input type="color" onChange={e => changeColor(e)} />
            </div>
            <div className="toolbar__right">
                <button className="toolbar__button toolbar__button--left" onClick={actionGoBack}></button>
                <button className="toolbar__button toolbar__button--right" onClick={actionGoNext}></button>
                <button className="toolbar__button toolbar__button--save" onClick={download}></button>
            </div>
        </div>
    )
}

export default Toolbar