import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import CreateChirp from './CreateChirp';
import wrapp from '../controllers/wrappComponent';
import Chirp from './Chirp';
import Profile from './ViewProfile';
import { fetchUserChirps, fetchNumOfFollower, fetchUserDetails } from '../redux/actions/fetcher';

let WrappCreateChirp = wrapp('create-chirp', CreateChirp);

class User extends Component {
    componentDidMount() {
        if (this.props.users !== 0 && this.props.user !== 0) {
            this.props.dispatch(fetchUserChirps(this.props.match.params.id, this.props.user.authtoken, this.props.dispatch))
            this.props.dispatch(fetchUserDetails(this.props.match.params.id, this.props.user.authtoken, this.props.dispatch))
            this.props.dispatch(fetchNumOfFollower(this.props.userDetails.username, this.props.user.authtoken, this.props.dispatch));
        };
    }
    render() {
        if (this.props.user === 0) return <Redirect to="/login" />
        if (this.props.chirps === 0 || this.props.userDetails === 0) { return null; }
        if (this.props.numOfFollowers === -1) return null;
        let userStats = {
            numOfChirps: this.props.chirps.length,
            numOfFollowers: this.props.numOfFollowers,
            numOfFollowing: this.props.userDetails.subs.length
        }
        return (
            <section id="viewMe">
                <div className="content">
                    {this.props.match.params.id === this.props.user.id ?
                        <WrappCreateChirp userStats={userStats} /> :
                        <Profile userStats={userStats} />
                    }
                    <div id="myChirps" className="chirps">
                        {this.props.chirps.length !== 0 ?
                            <div className="chirp">
                                <h2 className="titlebar">Chirps</h2>
                                {this.props.chirps.map((chirp, index) => (<Chirp key={index} chirp={chirp} id={this.props.match.params.id} />))}
                            </div> :
                            ''
                        }
                    </div>
                </div>
            </section>
        );
    }
}

function stateAsProps(state) {
    return {
        user: state.user,
        chirps: state.userChirps,
        userDetails: state.userDetails,
        numOfFollowers: state.numOfFollowers
    }
}


export default connect(stateAsProps)(User);