import React from 'react';
import {Route, Switch} from "react-router-dom";
import Loadable from 'react-loadable';

import InterceptRouter from './components/common/InterceptRouter'


import './App.scss';
import routes from './routes';
import NoMatch from './pages/aside/NoMatch';

const LoadableFooter = Loadable({
    loader: () => import('./components/common/Footer'),
    loading() {
        return <div>Loading...</div>
    }
});

function App() {
    return (
        <div className="App">
            <Switch>
                {routes.map(route => {
                    const ChildComponent = route.component;
                    return <Route
                        key={route.name}
                        path={route.path}
                        exact
                        render={(props) => <InterceptRouter>{<ChildComponent {...props}/>}</InterceptRouter>}/>
                })}
                {/* when none of the above match, <NoMatch> will be rendered */}
                <Route component={NoMatch}/>
            </Switch>
            <LoadableFooter/>
        </div>
    );
}

export default App;
