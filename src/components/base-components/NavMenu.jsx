import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {
    return (
        <div className="menu">
            {checkForLoggedInUser(props)}
        </div>
    );
}

function checkForLoggedInUser(props) {
    if (props.id) {
        return (
            <span>
                <Link to="/">Home</Link>
                <Link to="/discover">Discover</Link>
                <Link to={"/user/" + props.id}>Me</Link>
                <Link to="/logout">Logout</Link>
            </span>
        );
    } else {
        return (<span><Link to="/login">Login/Register</Link></span>);
    }
}