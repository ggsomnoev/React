import React, { Component } from 'react';
import '../../style/notifications.css';
import { connect } from 'react-redux';
import {clearError} from '../../redux/actions/actionCreators';

class Notifications extends Component {
    render() {
        return (
            <div id="notifications">
                <div id="loadingBox" className="notification" style={toggleStyle(this.props.status)}><span>Loading …</span></div>
                <div id="infoBox" className="notification"><span>Info</span></div>
                {this.props.error !== 0 ?
                    <div id="errorBox" className="notification" style= { {display: "block"}} onClick={()=>{this.props.dispatch(clearError())}}><span>{this.props.error + ''}</span></div>:
                    ''
                }

            </div>
        );
    }
}

function toggleStyle(check) {
    let style = { display: "none" };
    if (check !== 0) {
        style = { display: "block" }
    }
    return style;
}

function mapStateAsProps(state) {
    return {
        status: state.status,
        error: state.error
    }
}

export default connect(mapStateAsProps)(Notifications);