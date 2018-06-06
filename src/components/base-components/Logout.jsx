import { fetchLogout } from '../../redux/actions/fetcher';
import { Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Logout extends Component {
    componentDidMount() {
        this.props.dispatch(fetchLogout(this.props.user.authtoken, this.props.dispatch));
    }
    render() {
        if (this.props.user !== 0) return null;
        return <Redirect to="/login" />
    }
}

function stateAsProps(state) {
    return { user: state.user }
}


export default connect(stateAsProps)(Logout)