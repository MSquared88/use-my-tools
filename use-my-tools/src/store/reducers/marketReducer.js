import {GET_TOOLS_START, GET_TOOLS_SUCCESS, GET_TOOLS_FAIL} from '../actions'

const initialState = {
  allTools: [],
  toolsStatus: false,
}

export default function marketReducer(state = initialState, action) {
  switch (action.type) {
    //get tools
    case GET_TOOLS_START:
      return {
        ...state,
        toolsStatus: true,
      }
    case GET_TOOLS_SUCCESS:
      return {
        ...state,
        allTools: action.payload,
        toolsStatus: false,
      }
    case GET_TOOLS_FAIL:
      return {
        ...state,
        errMessage: action.payload,
        toolsStatus: false,
      }
    default:
      return state
  }
}
