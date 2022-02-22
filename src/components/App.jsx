import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { fetchData } from '../actions/general';
import { connect } from 'react-redux';
import Login from './Login';
import Nav from './Nav';
import Home from './Home';
import ManageCards from './ManageCards';
import NewPoll from './NewPoll';
import Leaderboard from './Leaderboard';
import NoMatch from './NoMatch';

const App = ({fetchData, authUser}) => {
  useEffect(()=>{fetchData()}, [fetchData])
  return (
    <Router>
      <div className="App">
        {authUser === null ? (
          <Route
            render={() => (
              <Login />
            )}
          />
        ) : (
          <Fragment>
            <Nav />
            <Fragment>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/questions/bad_id" component={NoMatch} />
                <Route path="/questions/:question_id" component={ManageCards} />
                <Route path="/add" component={NewPoll} />
                <Route path="/leaderboard" component={Leaderboard} />
                <Route component={NoMatch} />
              </Switch>
            </Fragment>
          </Fragment>
        )}
      </div>
    </Router>
  );
}

function mapStateToProps({ authUser }) {
  return {
    authUser
  };
}

export default connect(
  mapStateToProps,
  { fetchData }
)(App);
