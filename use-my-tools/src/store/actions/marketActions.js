import axiosWithAuth from '../../utils/authentication/axiosWithAuth'

export const GET_TOOLS_START = 'GET_TOOLS_START'
export const GET_TOOLS_SUCCESS = 'GET_TOOLS_SUCCESS'
export const GET_TOOLS_FAIL = 'GET_TOOLS_FAIL'

export const getTools =
  (filter = 'all') =>
  dispatch => {
    dispatch({type: GET_TOOLS_START})
    axiosWithAuth()
      .get('/api/tools')
      .then(res => {
        if (filter === 'all') {
          dispatch({
            type: GET_TOOLS_SUCCESS,
            payload: res.data,
          })
        } else {
          const filteredArray = res.data.filter(tool => {
            return tool.tool_type === filter
          })
          dispatch({
            type: GET_TOOLS_SUCCESS,
            payload: filteredArray,
          })
        }
      })
      .catch(err => {
        console.log(err)
        dispatch({type: GET_TOOLS_FAIL, payload: err})
      })
  }
