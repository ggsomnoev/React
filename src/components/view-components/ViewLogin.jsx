import React from 'react';
import {Link} from 'react-router-dom';

export default (props) => {
    return (
        <section id="viewLogin">
            <div className="content">
                <form id="formLogin" className="form" onSubmit={props.onSubmit}>
                    <label>Username</label>
                    <input name="username" type="text" value={props.username} onChange={props.onChange} required/>
                    <label>Password</label>
                    <input name="password" type="password" value={props.password} onChange={props.onChange} required/>
                    <input id="btnLogin" value="Sign In" type="submit" />
                    <Link to="/register">Register</Link>
                </form>
            </div>
        </section>
    );
}