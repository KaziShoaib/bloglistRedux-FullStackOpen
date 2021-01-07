const emptyNotification = { successMessage : null, errorMessage : null };

const notificationReducer = (state = emptyNotification, action ) => {
  switch(action.type){
    case 'SET_SUCCESS_MESSAGE':
      return { ...state, successMessage : action.message };
    case 'SET_ERROR_MESSAGE':
      return { ...state, errorMessage : action.message };
    case 'CLEAR_ALL':
      return emptyNotification;
    default:
      return state;
  }
};

let timeoutID = null;

export const createNotification = (notificationType, message, waitingTime) => {
  return async dispatch => {
    if(timeoutID !== null){
      clearTimeout(timeoutID);
    }
    const actionType = notificationType === 'success' ? 'SET_SUCCESS_MESSAGE' : 'SET_ERROR_MESSAGE';
    dispatch({
      type: actionType,
      message: message
    });
    timeoutID = setTimeout(() => {
      dispatch({
        type: 'CLEAR_ALL'
      });
    }, waitingTime);
  };
};

export default notificationReducer;

