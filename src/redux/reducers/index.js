import {combineReducers} from 'redux';

import status from './statusRed';
import user from './userRed';
import users from './usersRed';
import userChirps from './userChirpsRed';
import subsChirps from './subsChirpsRed';
import numOfFollowers from './numOfFollowersRed';
import userDetails from './userDetailsRed';
import error from './errorRed';


export default combineReducers({status, user, users, userChirps, subsChirps, numOfFollowers, userDetails, error});