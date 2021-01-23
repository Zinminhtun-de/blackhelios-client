import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "../../containers/HomeContainer/Loadable";
import DashBoard from "../../containers/private/DashContainer";
import { DashBoardProfile } from "../../containers/private/DashContainer/components";
const ROUTES = [
  { path: "/", key: "root", exact: true, component: Home },

  {
    path: "/dash",
    key: "DASHBOARD",
    component: (props) => {
      const isAuth = false;
      if (localStorage.getItem("user")) {
        alert("You need to log in to access app routes");
        return <Redirect to={"/"} />;
      }
      return <RenderRoutes {...props} />;
    },
    routes: [
      {
        path: "/dash",
        key: "DASHBOARD",
        exact: true,
        component: DashBoard,
      },
      {
        path: "/dash/profile",
        key: "DASHBOARD/PROFILE",
        exact: true,
        component: DashBoardProfile,
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
/**
 * Use this component for any new section of routes (any config object that has a "routes" property
 */ function RenderRoutes({ routes }) {
  return (
    <Switch>
      {routes.map((route, i) => {
        return <RouteWithSubRoutes key={route.key} {...route} />;
      })}
      <Route component={() => <h1>Not Found!</h1>} />
    </Switch>
  );
}

export { ROUTES, RenderRoutes };
