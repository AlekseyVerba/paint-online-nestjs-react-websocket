import { combineReducers } from "redux"
import { canvasReducer } from "./canvasReducer"
import { toolReducer } from "./toolReducer"

export const rootReducer = combineReducers({
    canvas: canvasReducer,
    tool: toolReducer
})

export type RootState = ReturnType<typeof rootReducer>