import React from 'react';
import {Link} from 'react-router-dom';

export default (props) => {
    return (
        <div className="userbox">
            <div><Link to={"/user/"+props.user._id} className="chirp-author">{props.user.username}</Link></div>
            <div className="user-details">
                <span>{props.user.numOfFollowers} followers</span>
            </div>
        </div>
    );
}