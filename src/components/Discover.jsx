import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUsers } from '../redux/actions/fetcher';
import UserBox from './UserBox';

class Discover extends Component {

    componentDidMount() {
        if (this.props.user !== 0) {
            this.props.dispatch(fetchUsers(this.props.user.authtoken, this.props.dispatch))
        };
    }

    render() {
        if (this.props.user === 0) return <Redirect to="/login" />
        if (this.props.users === 0) return null;
        return (
            <section id="viewDiscover">
                <div className="content">
                    <div className="chirps">
                        <h2 className="titlebar">Discover</h2>
                        <div id="userlist">
                            {this.props.users.map((data, index) => (
                                data.username !== this.props.user.username?
                                <UserBox key={index} user={data} />:
                                ''
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

function stateAsProps(state) {
    return {
        user: state.user,
        users: state.users
    }
}
export default connect(stateAsProps)(Discover);