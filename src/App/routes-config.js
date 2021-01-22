import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "../containers/HomeContainer";
function RenderRoutes({ routes }) {
  return (
    <Switch>
      {routes.map((route, i) => {
        return <RouteWithSubRoutes key={route.key} {...route} />;
      })}
      <Route component={() => <h1>Not Found!</h1>} />
    </Switch>
  );
}
const ROUTES = [
  { path: "/", key: "ROOT", exact: true, component: Home },
  {
    path: "/app",
    key: "APP",
    component: (props) => {
      const isAuth = false;
      if (isAuth) {
        return <Redirect to={"/"} />;
      }
      return <RenderRoutes {...props} />;
    },
    routes: [
      {
        path: "/app",
        key: "APP_ROOT",
        exact: true,
        component: () => <h1>App Index</h1>,
      },
      {
        path: "/app/page",
        key: "APP_PAGE",
        component: () => <h1>App Page</h1>,
      },
    ],
  },
];

/**
 * Render a route with potential sub routes
 * https://reacttraining.com/react-router/web/example/route-config
 */
function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => <route.component {...props} routes={route.routes} />}
    />
  );
}
/**
 * Use this component for any new section of routes (any config object that has a "routes" property
 */

export { ROUTES, RenderRoutes, RouteWithSubRoutes };
