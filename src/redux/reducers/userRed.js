import * as actionType from '../actions/actionTypes';

export default (state = 0, action) => {
    switch (action.type) {
        case actionType.USER_DATA:
            return action.data;
        case actionType.USER_LOGOUT:
            return 0;
        default:
            return state;
    }
}