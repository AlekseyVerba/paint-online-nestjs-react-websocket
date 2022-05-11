import { ActionTool, IStateTool, TypeActionTool } from "../../../types/reducers/tool"

const defaultStateTool: IStateTool = {
    tool: null
}

export const toolReducer = (state = defaultStateTool, action: ActionTool): IStateTool => {


    switch(action.type) {

        case TypeActionTool.ADD_TOOL: {
            return {
                ...state,
                tool: action.payload
            }
        }

        default: {
            return state
        }
    }
}