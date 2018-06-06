import React from 'react';
import UserStats from './UserStats';
import { connect } from 'react-redux';
import { followUnfollowUser } from '../redux/actions/fetcher';


export default connect(stateAsProps)((props) => {
    return (
        <div className="chirper">
            <h2 className="titlebar">{props.username}</h2>
            {props.loggedUserSubs.includes(props.username) ?
                <button id="btnFollow" className="chirp-author" onClick={
                    () => { followUnfollow('unfollow', props.authtoken, props.loggedUserSubs, props.username, props.loggedUserId, props.dispatch) }
                }>Unfollow</button> :
                <button id="btnFollow" className="chirp-author" onClick={
                    () => { followUnfollow('follow', props.authtoken, props.loggedUserSubs, props.username, props.loggedUserId, props.dispatch) }
                }>Follow</button>
            }
            <UserStats
                numOfChirps={props.userStats.numOfChirps}
                numOfFollowers={props.userStats.numOfFollowers}
                numOfFollowing={props.userStats.numOfFollowing}
            />
        </div>
    );
});

function stateAsProps(state) {
    return {
        username: state.userDetails.username,
        authtoken: state.user.authtoken,
        loggedUserSubs: state.user.subs,
        loggedUserId: state.user.id
    }
}

function followUnfollow(option, authtoken, subs, username, userId, dispatch) {
    switch (option) {
        case 'follow': subs.push(username); break;
        case 'unfollow': subs.splice(subs.indexOf(username), 1); break;
        default: console.log('Problem with following switch statement!');
    }
    let data = { subscriptions: subs }
    dispatch(followUnfollowUser(authtoken, userId, data, dispatch));
}