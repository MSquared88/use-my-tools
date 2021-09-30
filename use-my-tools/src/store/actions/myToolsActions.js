import axiosWithAuth from "../../utils/authentication/axiosWithAuth";

export const GET_USERTOOLS_START = "GET_USERTOOLS_START";
export const GET_USERTOOLS_SUCCESS = "GET_USERTOOLS_SUCCESS";
export const GET_USERTOOLS_FAIL = "GET_USERTOOLS_FAIL";

export const ADD_TOOL_START = "ADD_TOOL_START";
export const ADD_TOOL_SUCCESS = "ADD_TOOL_SUCCESS";
export const ADD_TOOL_FAIL = "ADD_TOOL_FAIL";

export const UPDATE_TOOL_START = "UPDATE_TOOL_START";
export const UPDATE_TOOL_SUCCESS = "UPDATE_TOOL_SUCCESS";
export const UPDATE_TOOL_FAIL = "UPDATE_TOOL_FAIL";

export const DELETE_TOOL_START = "DELETE_TOOL_START";
export const DELETE_TOOL_SUCCESS = "DELETE_TOOL_SUCCESS";
export const DELETE_TOOL_FAIL = "DELETE_TOOL_FAIL";

export const REQUEST_TOOL_START = "REQUEST_TOOL_START";
export const REQUEST_TOOL_SUCCESS = "REQUEST_TOOL_SUCCESS";
export const REQUEST_TOOL_FAIL = "REQUEST_TOOL_FAIL";

export const GET_REQUESTS_START = "GET_REQUESTS_START";
export const GET_REQUESTS_SUCCESS = "GET_  REQUESTS_SUCCESS";
export const GET_REQUESTS_FAIL = "GET_ REQUESTS_FAIL";

export const DELETE_REQUEST_START = "DELETE_REQUESTS_START";
export const DELETE_REQUEST_SUCCESS = "DELETE_  REQUESTS_SUCCESS";
export const DELETE_REQUEST_FAIL = "DELETE_ REQUESTS_FAIL";

export const UPLOAD_IMAGE_START = "UPLOAD_IMAGE_START";
export const UPLOAD_IMAGE_SUCCESS = "UPLOAD_IMAGE_SUCCESS";
export const UPLOAD_IMAGE_FAIL = "UPLOAD_IMAGE_FAIL";

export const DELETE_IMAGE_START = "DELETE_IMAGE_START";
export const DELETE_IMAGE_SUCCESS = "DELETE_IMAGE_SUCCESS";
export const DELETE_IMAGE_FAIL = "DELETE_IMAGE_FAIL";

export const getUserTools = () => (dispatch) => {
  dispatch({ type: GET_USERTOOLS_START });
  axiosWithAuth()
    .get("/api/user-tools")
    .then((res) => {
      dispatch({ type: GET_USERTOOLS_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: GET_USERTOOLS_FAIL, payload: err });
    });
};

export const addTool = (tool) => (dispatch) => {
  const newTool = {
    rental_cost: tool.rental_cost,
    tool_description: tool.tool_description,
    tool_name: tool.tool_name,
    tool_type: tool.tool_type,
    available: tool.available,
  };
  dispatch({ type: ADD_TOOL_START });
  console.log("from ADD_TOOL_START action", newTool);
  axiosWithAuth()
    .post("/api/tools", newTool)
    .then((res) => {
      console.log(res);
      dispatch({ type: ADD_TOOL_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: ADD_TOOL_FAIL, payload: err });
    });
};

export const updateTool = (tool) => (dispatch) => {
  dispatch({ type: UPDATE_TOOL_START });
  axiosWithAuth()
    .put(`/api/tools/${tool.id}`, tool)
    .then((res) => {
      dispatch({ type: UPDATE_TOOL_SUCCESS, payload: res.data });
      console.log("from updateTool", tool);
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: UPDATE_TOOL_FAIL, payload: err });
    });
};

export const deleteTool = (toolid) => (dispatch) => {
  dispatch({ type: DELETE_TOOL_SUCCESS, payload: toolid });

  axiosWithAuth()
    .delete(`api/tools/${toolid}`)
    .then((res) => {
      dispatch({ type: DELETE_TOOL_SUCCESS, payload: toolid });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: DELETE_TOOL_FAIL, payload: err });
    });
};

export const requestTool = (request) => (dispatch) => {
  dispatch({ type: REQUEST_TOOL_START });
  console.log(request);
  axiosWithAuth()
    .post(`api/tools/requests`, request)
    .then((res) => {
      dispatch({ type: REQUEST_TOOL_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: REQUEST_TOOL_FAIL, payload: err });
    });
};

export const getRequests = () => (dispatch) => {
  dispatch({ type: GET_REQUESTS_START });
  axiosWithAuth()
    .get("api/tools/requests")
    .then((res) => {
      dispatch({ type: GET_REQUESTS_SUCCESS, payload: res.data });
    })

    .catch((err) => {
      console.log(err);
      dispatch({ type: GET_REQUESTS_FAIL, payload: err });
    });
};

export const deleteRequest = (id) => (dispatch) => {
  dispatch({ type: DELETE_REQUEST_START });
  axiosWithAuth()
    .delete(`api/tools/requests/${id}`)
    .then((res) => {
      console.log(res);
      dispatch({ type: DELETE_REQUEST_SUCCESS, payload: id });
    })

    .catch((err) => {
      console.log(err);
      dispatch({ type: DELETE_REQUEST_FAIL, payload: err });
    });
};

export const uploadImage = (image, tool) => (dispatch) => {
  let data = new FormData();
  data.append("image", image, image.name);
  dispatch({ type: UPLOAD_IMAGE_START });
  axiosWithAuth()
    .put(`api/tools/uploadImage/${tool.id}`, data)
    .then((res) => {
      dispatch({ type: UPLOAD_IMAGE_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: UPDATE_TOOL_FAIL, payload: err });
    });
};

export const deleteImage = (tool) => (dispatch) => {
  dispatch({ type: DELETE_IMAGE_START });
  axiosWithAuth()
    .put(`api/tools/deleteImage/${tool.id}`, tool)
    .then((res) => {
      dispatch({ type: DELETE_IMAGE_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: DELETE_IMAGE_FAIL, payload: err });
      console.log("from DELETE_IMAGE_FAIL" + err);
    });
};
