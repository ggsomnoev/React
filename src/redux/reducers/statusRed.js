import * as actionType from '../actions/actionTypes';

export default (state = 0, action) => {
    switch (action.type) {
        case actionType.BEGIN_REQUEST:
            return state + 1;
        case actionType.USER_DATA:
        case actionType.USERS_DATA:
        case actionType.USER_CHIRPS:
        case actionType.USER_DETAILS:
        case actionType.SUBSCRIPTION_CHIRPS:
        case actionType.NUMBER_OF_FOLLOWERS:
        case actionType.ERROR:
            return state - 1;
        default:
            return state;
    }
}