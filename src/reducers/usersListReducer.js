import userListService from '../services/userList';


const userListReducer = (state=[], action) => {
  switch(action.type) {
    case 'INIT_USERS':
      return action.data;
    default:
      return state;
  }
};


export const initializeUserList = () => {
  return async dispatch => {
    const userList = await userListService.getAll();
    dispatch({
      type: 'INIT_USERS',
      data: userList
    });
  };
};


export default userListReducer;