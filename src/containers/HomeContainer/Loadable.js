/**
 * Asynchronously loads the component for HomePage
 */

import React from "react";
import loadable from "../../utils/loadable";
import LoaderOne from "../../components/common/loaders/LoaderOne/LoaderOne";
export default loadable(() => import("./index"), {
  fallback: <LoaderOne />,
});
