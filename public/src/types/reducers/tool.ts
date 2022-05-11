export enum TypeActionTool {
    ADD_TOOL = "ADD_TOOL"
}

interface actionAddTool {
    type: TypeActionTool.ADD_TOOL
    payload: any
}

export type ActionTool = actionAddTool

export interface IStateTool {
    tool: any
}