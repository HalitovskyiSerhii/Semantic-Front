import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFoundRoute from '../NotFoundRoute';
import Analyze from '../Analyze';
import Header from '../../components/Header';
import Texts from '../Texts';

const Routing = () => (
  <div className="fill">
    <header>
      <Header />
    </header>
    <main className="fill">
      <Switch>
        <Route exact path="/analyze" render={props => <Analyze {...props} />} />
        <Route exact path="/all" render={props => <Texts {...props} />} />
        {/* <Route exact path="/top" render={props => <Top {...props} />} />*/}
        <NotFoundRoute condition path="*" redirectTo="/analyze" />
      </Switch>
    </main>
  </div>
);

export default Routing;

