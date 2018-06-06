import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


function stateAsProps(state) {
    return { user: state.userRed }
}

export default connect(stateAsProps)(props => {
    if (props.user === 0) {
        return <Redirect to="/login" />
    }
    return null;
});