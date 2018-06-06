import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import WrappedComponents from '../utils/wrappedComponents';
import Logout from './base-components/Logout';

class Routes extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={WrappedComponents.Home} />
                <Route path="/login" component={WrappedComponents.WrappedLogin} />
                <Route path="/register" component={WrappedComponents.WrappedRegister} />
                <Route path="/user/:id" component={WrappedComponents.User} />
                <Route path="/discover" component={WrappedComponents.Discover} />
                <Route path="/logout" component={Logout} />
            </div>
        );
    }
}

export default Routes;