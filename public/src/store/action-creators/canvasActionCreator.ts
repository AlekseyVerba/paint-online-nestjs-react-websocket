import { Socket } from "socket.io-client"
import { ActionCanvas, ActionTypeCanvas } from "../../types/reducers/canvas"
import { IUser } from "../../types/user"

export const actionAddCanvas = (payload: HTMLCanvasElement): ActionCanvas => {
    return {
        type: ActionTypeCanvas.ADD_CANVAS,
        payload
    }
}

export const actionAddUpdateToInfoUpdates = (payload: string): ActionCanvas => {
    return {
        type: ActionTypeCanvas.ADD_UPDATE_TO_INFO_UPDATES,
        payload
    }
}

export const actionGoBack = (): ActionCanvas => {
    return {
        type: ActionTypeCanvas.GO_BACK
    }
}

export const actionGoNext = ():ActionCanvas => {
    return {
        type: ActionTypeCanvas.GO_NEXT
    }
}

export const actionChangeName = (payload: string): ActionCanvas => {
    return {
        type: ActionTypeCanvas.CHANGE_NAME,
        payload
    }
}

export const actionAddId = (payload: string): ActionCanvas => {
    return {
        type: ActionTypeCanvas.ADD_ID,
        payload
    }
}

export const actionAddSocket = (payload: Socket): ActionCanvas => {
    return {
        type: ActionTypeCanvas.ADD_SOCKET,
        payload
    }
}

export const actionAddUser = (payload: IUser): ActionCanvas => {
    return {
        type: ActionTypeCanvas.ADD_USER,
        payload
    }
}

export const actionRemoveUser = (payload: IUser): ActionCanvas => {
    return {
        type: ActionTypeCanvas.REMOVE_USER,
        payload
    }
}

export const actionGetAllUsers = (payload: IUser[]): ActionCanvas => {
    return {
        type: ActionTypeCanvas.GET_ALL_USERS,
        payload
    }
}