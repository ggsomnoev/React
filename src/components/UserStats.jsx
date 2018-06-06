import React from 'react';

export default (props) => {
    return (
        <div id="userStats" className="user-details">
            <span>{props.numOfChirps} chirps</span> | <span>{props.numOfFollowing} following</span> | <span>{props.numOfFollowers} followers</span>
        </div>
    );
}