import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Chirp from './Chirp';
import CreateChirp from './CreateChirp';
import wrapp from '../controllers/wrappComponent';
import { fetchSubsChirps, fetchNumOfFollower, fetchUserChirps } from '../redux/actions/fetcher';

const WrappCreateChirp = wrapp('create-chirp', CreateChirp);

class Feed extends Component {
    componentDidMount() {
        if (this.props.user !== 0) {
            //get subscribtion chirps
            this.props.dispatch(fetchSubsChirps(this.props.authtoken, this.props.subs, this.props.dispatch));

            //populate numOfFollowers and userChrips states in store
            this.props.dispatch(fetchNumOfFollower(this.props.username, this.props.authtoken, this.props.dispatch));
            if (this.props.userChirps === 0) {
                this.props.dispatch(fetchUserChirps(this.props.id, this.props.authtoken, this.props.dispatch));
            }
        };
    }

    render() {
        if (this.props.user === 0 || this.props.id === undefined) { return <Redirect to="/login" /> }
        if (this.props.chirps === 0) return null;
        let userStats = {
            numOfChirps: this.props.userChirps.length,
            numOfFollowers: this.props.numOfFollowers,
            numOfFollowing: this.props.numOfFollowing.length
        }
        return (
            <section id="viewFeed">
                <div className="content">
                    <WrappCreateChirp userStats={userStats} />
                    {this.props.chirps.length !== 0 ?
                        <div id="chirps" className="chirps"><h2 className="titlebar">Chirps</h2>
                            {this.props.chirps.map((chirp, index) => (<Chirp key={index} chirp={chirp} id={this.props.id} />))}
                        </div>:
                        ''
                    }
                </div>
            </section>
        );
    }
}

function stateAsProps(state) {
    if (state.user !== 0) {
        return {
            username: state.user.username,
            id: state.user.id,
            subs: state.user.subs,
            authtoken: state.user.authtoken,
            chirps: state.subsChirps,
            userChirps: state.userChirps,
            numOfFollowing: state.user.subs,
            numOfFollowers: state.numOfFollowers
        }
    }
    return { user: state.user }
}

export default connect(stateAsProps)(Feed);