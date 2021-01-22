import { MagicSpinner } from "react-spinners-kit";

import React from "react";
import PropTypes from "prop-types";

function LoaderOne({}) {
  return (
    <div className="">
      <MagicSpinner size={250} color="#14B795" loading={true} />
    </div>
  );
}

LoaderOne.propTypes = {};

export default LoaderOne;
