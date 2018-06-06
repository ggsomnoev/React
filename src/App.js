import React, { Component } from 'react';
import { connect } from 'react-redux';
import './style/site.css';
import './style/notifications.css';
import Header from './components/base-components/Header';
import Footer from './components/base-components/Footer';
import NavMenu from './components/base-components/NavMenu.jsx';
import Notifications from './components/base-components/Notifications';
import Routes from './components/Routes';
import { BrowserRouter as Router } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <div className="main">
            <Header />
            <NavMenu id={this.props.id}/>
            <Routes />
            <Footer />
          </div>
          <div className="notifications">
            <Notifications />
          </div>
        </div>
      </Router>
    );
  }
}


function mapStateAsProps(state) {
  return { 
    id: state.user.id
  }
}
export default connect(mapStateAsProps)(App);
