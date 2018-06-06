import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {
    return (
        <section id="viewRegister">
            <div className="content">
                <form className="form" id="formRegister" onSubmit={props.onSubmit}>
                    <label>Username</label>
                    <input name="username" type="text" value={props.username} onChange={props.onChange} required/>
                    <label>Password</label>
                    <input name="password" type="password" value={props.password} onChange={props.onChange} required/>
                    <label>Repeat Password</label>
                    <input name="repassword" type="password" value={props.repassword} onChange={props.onChange} required/>
                    <input id="btnRegister" value="Register" type="submit" />
                    <Link to="/login">Login</Link>
                </form>
            </div>
        </section>
    );
}