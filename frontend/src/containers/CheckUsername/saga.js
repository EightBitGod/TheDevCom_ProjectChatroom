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

const CheckUsernameSuccess = (success,encryptedAlias) => {
  return{
    type: ACTIONS.POST_SUCCESS,
    success,
    encryptedAlias,
  }
};

const CheckUsernameFailure = (error) => {
  return{
    type: ACTIONS.POST_FAILURE,
    error,
  }
};

//REDUCER
const initialState = {
  pending: false,
  success: false,
  encryptedAlias: '',
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
        encryptedAlias: action.encryptedAlias,
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
export const getSuccess = state => state.usernameReducer.success;
export const getUsernamePending = state => state.usernameReducer.pending;
export const getEncryptedAlias = state => state.usernameReducer.encryptedAlias;
export const getUsernameError = state => state.usernameReducer.error;

//SAGA
export default function fetchUsername(username) {
  return dispatch => {
    dispatch(CheckUsernamePending());
    return fetch('http://127.0.0.1:8000/chat/check', {
      method: 'POST',
      body: JSON.stringify({alias: username})
    })
    .then(res => res.json())
    .then(res => dispatch(CheckUsernameSuccess(res.success,res.encrypted_alias)))
    .catch(error => {
      dispatch(CheckUsernameFailure(error));
    })
  };
}
