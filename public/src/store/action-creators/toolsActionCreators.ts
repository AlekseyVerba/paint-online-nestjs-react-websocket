import { ActionTool, TypeActionTool } from "../../types/reducers/tool"

export const actionAddTool = (payload: any): ActionTool => {
    return {
        type: TypeActionTool.ADD_TOOL,
        payload
    }
}