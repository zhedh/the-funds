import React from "react";
import {Route, Switch} from "react-router-dom";
import Loadable from "react-loadable";
import InterceptRouter from "./components/common/InterceptRouter";
import routes from "./routes";
import NoMatch from "./pages/exception/404";

import "./App.scss";

const LoadableFooter = Loadable({
  loader: () => import("./components/common/Footer"),
  loading() {
    return ''
  }
});

function App() {
  return (
    <div className="App">
      <Switch>
        {routes.map(route => {
          const ChildComponent = route.component;
          return (
            <Route
              key={route.name}
              path={route.path}
              exact
              render={props => (
                <InterceptRouter>
                  {<ChildComponent {...props} />}
                </InterceptRouter>
              )}
            />
          );
        })}
        {/* when none of the above match, <NoMatch> will be rendered */}
        <Route component={NoMatch}/>
      </Switch>
      <LoadableFooter/>
    </div>
  );
}

export default App;
