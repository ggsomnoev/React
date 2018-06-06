import * as actionType from '../actions/actionTypes';

export default (state = 0, action) => {
    switch (action.type) {
        case actionType.ERROR:
            return action.error;
        case actionType.CLEAR_ERROR:
            return 0;
        default:
            return state;
    }
}