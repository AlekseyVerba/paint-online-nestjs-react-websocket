import { Socket } from "socket.io-client"
import { IUser } from "../user"

export enum ActionTypeCanvas {
    ADD_CANVAS = "ADD_CANVAS",
    ADD_UPDATE_TO_INFO_UPDATES = "ADD_UPDATE_TO_INFO_UPDATES",
    GO_NEXT = "GO_NEXT",
    GO_BACK = "GO_BACK",
    CHANGE_NAME = "CHANGE_NAME",
    ADD_ID = "ADD_ID",
    ADD_SOCKET = "ADD_SOCKET",
    ADD_USER = "ADD_USER",
    REMOVE_USER = "REMOVE_USER",
    GET_ALL_USERS = "GET_ALL_USERS"
}

interface actionAddCanvas {
    type: ActionTypeCanvas.ADD_CANVAS
    payload: HTMLCanvasElement
}

interface actionAddUpdateToInfoUpdates {
    type: ActionTypeCanvas.ADD_UPDATE_TO_INFO_UPDATES
    payload: string
}

interface actionGoNext {
    type: ActionTypeCanvas.GO_NEXT
}

interface actionGoBack {
    type: ActionTypeCanvas.GO_BACK
}

interface actionChangeName {
    type: ActionTypeCanvas.CHANGE_NAME,
    payload: string
}

interface actionAddId {
    type: ActionTypeCanvas.ADD_ID,
    payload: string
}

interface actionAddSocket {
    type: ActionTypeCanvas.ADD_SOCKET,
    payload: Socket
}

interface actionAddUser {
    type: ActionTypeCanvas.ADD_USER,
    payload: IUser
}

interface actionRemoveUser {
    type: ActionTypeCanvas.REMOVE_USER
    payload: IUser
}

interface actionGetAllUsers {
    type: ActionTypeCanvas.GET_ALL_USERS,
    payload: IUser[]
}

export type ActionCanvas = actionAddCanvas | actionAddUpdateToInfoUpdates | actionGoNext | actionGoBack | actionChangeName | actionAddId | actionAddSocket | actionAddUser | actionRemoveUser | actionGetAllUsers

export interface IStateCanvas {
    canvasEl: null | HTMLCanvasElement
    updates: string[],
    oldUpdates: string[]
    username: string,
    idPaint: string | null,
    socket: Socket | null,
    users: IUser[]
}
