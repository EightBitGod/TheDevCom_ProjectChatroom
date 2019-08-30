//CONSTANTS
const ACTIONS = {
  POST: 'USERNAME_CREATE_POST',
  POST_SUCCESS: 'USERNAME_CREATE_POST_SUCCESS',
  POST_FAILURE: 'USERNAME_CREATE_POST_FAILURE',
};

//ACTIONS
const CheckUsernamePending = () => {

  return{
    type: ACTIONS.POST,
  }
};

const CheckUsernameSuccess = (success) => {
  return{
    type: ACTIONS.POST_SUCCESS,
    success: success,
  }
};

const CheckUsernameFailure = (error) => {
  return{
    type: ACTIONS.POST_FAILURE,
    error: error,
  }
};

//REDUCER
const initialState = {
  pending: false,
  success: false,
  error: null,
};

export function usernameReducer(state=initialState,action) {
  switch (action.type) {
    case ACTIONS.POST:
      return{
        ...state,
        pending: true,
      };
    case ACTIONS.POST_SUCCESS:
      return {
        ...state,
        pending: false,
        success: action.success,
      };
    case ACTIONS.POST_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    default:
      return state;
  }
}

//SELECTORS
export const getSuccess = state => state.success;
export const getUsernamePending = state => state.pending;
export const getUsernameError = state => state.error;

//SAGA
export default function fetchUsername(username) {

  return dispatch => {
    dispatch(CheckUsernamePending());
    fetch('http://127.0.0.1:8000/chat/check',{
      body: {"alias": username}
    })
    .then(res => res.json())
    .then(res => {
      dispatch(CheckUsernameSuccess(res.success));
      return res;
    }).catch(error => {
      dispatch(CheckUsernameFailure(error));
    })
  }
}
