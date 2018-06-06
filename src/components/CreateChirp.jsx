import React from 'react';
import UserStats from './UserStats';

export default (props) => {
    return (
        <div className="chirper">
            <h2 className="titlebar">{props.username}</h2>
            <form id="formSubmitChirp" className="chirp-form" onSubmit={props.onSubmit}>
                <textarea name="chirpText" className="chirp-input" defaultValue={props.chirpText} onChange={props.onChange} required/>
                <input className="chirp-submit" id="btnSubmitChirp" defaultValue="Chirp" type="submit" />
            </form>
            <UserStats 
                 numOfChirps = {props.userStats.numOfChirps}
                 numOfFollowing = {props.userStats.numOfFollowing}
                 numOfFollowers = {props.userStats.numOfFollowers}
            />
        </div>
    );
};