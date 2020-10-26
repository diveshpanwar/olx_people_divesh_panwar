import React, { Suspense, lazy } from 'react';
import { createBrowserHistory } from "history";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoaderComponent from '../common/loader.component';
const NavigationComponent = lazy(() => import('../components/navigation/navigation.component'));
const ContinentsComponent = lazy(() => import('../components/continents/continents.component'));
const history = createBrowserHistory();

export default (
    <Router history={history}>
        <Suspense fallback={
            <LoaderComponent />
        }>
            <div style={{ width: '100%' }}>
                <Route path="/" component={NavigationComponent} />
                <Route exact path="/" component={ContinentsComponent} />
            </div>
        </Suspense>
    </Router>
);