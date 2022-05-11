import { ActionCanvas, ActionTypeCanvas, IStateCanvas } from "../../../types/reducers/canvas"

const defaultState: IStateCanvas = {
    canvasEl: null,
    updates: [],
    oldUpdates: [],
    username: "",
    idPaint: null,
    socket: null,
    users: []
}


export const canvasReducer = (state = defaultState, action: ActionCanvas): IStateCanvas => {

    switch(action.type) {

        case ActionTypeCanvas.ADD_CANVAS: {
            return {
                ...state,
                canvasEl: action.payload
            }
        }

        case ActionTypeCanvas.ADD_UPDATE_TO_INFO_UPDATES: {
            return {
                ...state,
                updates: [...state.updates, action.payload]
            }
        }

        case ActionTypeCanvas.GO_BACK: {
            const context = state.canvasEl?.getContext("2d")

            if (state.updates.length) {
                const img = new Image()
                const currentUrl = state.canvasEl?.toDataURL()
                const copyArray = [...state.updates]
                const lastUpdate = copyArray.pop()!

                state.socket!.emit("update", {lastUpdate, id: state.idPaint})
                
                img.src = lastUpdate
                img.onload = () => {
                    context?.clearRect(0, 0, state.canvasEl!.width, state.canvasEl!.height)
                    context?.drawImage(img, 0, 0, state.canvasEl!.width, state.canvasEl!.height)
                }


                return {
                    ...state,
                    updates: copyArray,
                    oldUpdates: [...state.oldUpdates, currentUrl!]
                }
            } else {
                context?.clearRect(0, 0, state.canvasEl!.width, state.canvasEl!.height)
            }

            return {
                ...state
            }
        }

        case ActionTypeCanvas.GO_NEXT: {
            if (state.oldUpdates.length) {
                // debugger
                const context = state.canvasEl?.getContext("2d")
                const currentUrl = state.canvasEl!.toDataURL()
                const img = new Image()
                const copyArray = [...state.oldUpdates]
                const lastUpdate = copyArray.pop()!
                // debugger
                state.socket!.emit("update", {lastUpdate, id: state.idPaint})
                img.src = lastUpdate
                img.onload = () => {
                
                    context?.clearRect(0, 0, state.canvasEl!.width, state.canvasEl!.height)
                    context?.drawImage(img, 0, 0, state.canvasEl!.width, state.canvasEl!.height)
                }

                return {
                    ...state,
                    oldUpdates: copyArray,
                    updates: [...state.updates, currentUrl]
                }
            }

            return state
        }

        case ActionTypeCanvas.CHANGE_NAME: {
            return {
                ...state,
                username: action.payload
            }
        }

        case ActionTypeCanvas.ADD_ID: {
            return {
                ...state,
                idPaint: action.payload
            }
        }

        case ActionTypeCanvas.ADD_SOCKET: {
            return {
                ...state,
                socket: action.payload
            }
        }

        case ActionTypeCanvas.ADD_USER: {
            return {
                ...state,
                users: [...state.users, action.payload]
            }
        }

        case ActionTypeCanvas.REMOVE_USER: {
            return {
                ...state,
                users: [...state.users.filter(user => user.id !== action.payload.id)]
            }
        }

        case ActionTypeCanvas.GET_ALL_USERS: {
            return {
                ...state,
                users: action.payload
            }
        }

        default: {
            return state
        }
    }
}