import React, { useState } from "react"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import User from "../User"
import "../../styles/settingbar.scss"

const SettingBar: React.FC = () => {

    const [inputValue, setInputValue] = useState<any>(1)
    const { tool: { tool }, canvas: { users } } = useTypedSelector(state => state)

    const changeValueInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setInputValue(event.target.value)
        tool.setSize = +event.target.value
    }

    const changeColor = (event: React.ChangeEvent<HTMLInputElement>) => {
        const color = event.target.value
        tool.setStrokeStyle = color
    }

    return (
        <div className="settingbar">
            <div className="settingbar__left-half">
                <div className="settingbar__block settingbar__block--first">
                    <h6>Толщина линии</h6>
                    <input className="settingbar__input" onChange={e => changeValueInput(e)} value={inputValue} type="number" />
                </div>
                <div className="settingbar__block settingbar__block--second">
                    <h6>Цвет линии</h6>
                    <input type="color" onChange={e => changeColor(e)} />
                </div>
            </div>

            <div className="settingbar__users">
                {users.map(user => {
                    return <User key={user.id} {...user} />
                } )}
            </div>

        </div>
    )
}

export default SettingBar