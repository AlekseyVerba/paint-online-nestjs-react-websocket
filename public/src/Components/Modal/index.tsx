import React, { useState } from "react"
import { useActions } from "../../hooks/useActions"
import "../../styles/modal.scss"

interface IPropModal {
    closeModal(): void
}

const Modal: React.FC<IPropModal> = ({closeModal}) => {

    const [currentNameInput, setCurrentNameInput] = useState<string>("")
    const { actionChangeName } = useActions()

    const changeValueName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentNameInput(e.target.value)
    }

    const saveName = () => {
        console.log("eee")
        closeModal()
        actionChangeName(currentNameInput)
    }

    return (
        <div className="modal modal--active">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Введите ваше имя</h5>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                        
                            <input type="text" value={currentNameInput} onChange={e => changeValueName(e)} className="form-control" placeholder="Имя" />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button onClick={saveName} type="button" className="btn btn-primary">Сохранить</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal