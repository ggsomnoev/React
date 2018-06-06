import React, { Component } from 'react';
import getFormStates from '../utils/getFormStates';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser, createChirp } from '../redux/actions/fetcher';


export default function wrappComponent(formName, Comp) {
    class WrappedComponent extends Component {
        constructor(props) {
            super(props);
            this.state = getFormStates(formName);

            this.onChange = this.onChange.bind(this);
            this.onSubmit = this.onSubmit.bind(this);
        }

        onChange(e) {
            this.setState({ [e.target.name]: e.target.value });
        }

        onSubmit(e) {
            e.preventDefault();
            if (formName === "create-chirp") {
                let data = { text: this.state.chirpText, author: this.props.user.username }
                this.props.createChirpRequest(this.props.user.username, this.props.user.authtoken, data);
            } else {
                this.props.sendRequest(formName, this.state);
            }
        }
        render() {
            if (formName !== "create-chirp" && this.props.user !== 0) return <Redirect to='/' />
            return (
                <Comp {...this.state} onChange={this.onChange} onSubmit={this.onSubmit} userStats={this.props.userStats} />
            );
        }
    }


    function mapStateAsProps(state) {
        return {
            user: state.user
        }
    }
    function mapDispatchAsProps(dispatch) {
        return {
            sendRequest: (formName, data) => { dispatch(fetchUser(formName, data, dispatch)) },
            createChirpRequest: (username, authtoken, data) => { dispatch(createChirp(username, authtoken, data, dispatch)) }
        }
    }

    return connect(mapStateAsProps, mapDispatchAsProps)(WrappedComponent);
}
