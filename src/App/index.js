import React, { Fragment, Suspense } from "react";
import PropTypes from "prop-types";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import Home from "../containers/HomeContainer/Loadable";
import { RenderRoutes, ROUTES } from "./routes-config";
import { Link } from "react-router-dom";

function App({}) {
  return (
    <Fragment>
      <Helmet>
        <title>React Boilerplate</title>
        <meta name="" />
        <meta name="keywords" content="" />
      </Helmet>
      <div>
        <RenderRoutes routes={ROUTES} />
      </div>
    </Fragment>
  );
}

App.propTypes = {};

export default App;
