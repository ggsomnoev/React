import * as actionType from '../actions/actionTypes';

export default (state = -1, action) => {
    switch (action.type) {
        case actionType.NUMBER_OF_FOLLOWERS:
            return action.data;
        case actionType.USER_LOGOUT:
            return 0;
        default:
            return state;
    }
}