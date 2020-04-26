import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import TabBar from './components/TabBar';
import TrackerPage from './pages/TrackerPage';
import SelectTrackerPage from './pages/SelectTrackerPage';

function App() {
  return (
    <div className="app">
      <Route path="/" exact>
        <Redirect to="/tracker/" />
      </Route>
      <Route path={['/tracker/:trackerId', '/tracker']}>
        <TabBar />
        <Switch>
          <Route path="/tracker" exact>
            <SelectTrackerPage />
          </Route>
          <Route path="/tracker/:trackerId">
            <TrackerPage />
          </Route>
        </Switch>
      </Route>
    </div>
  );
}

export default App;
