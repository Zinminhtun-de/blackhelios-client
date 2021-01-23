import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { useInjectReducer } from "../../utils/reducer/injectReducer";
import { useInjectSaga } from "../../utils/saga/injectSaga";
import { createStructuredSelector } from "reselect";
import { makeSelectLoading, makeSelectError } from "../../App/selectors";
import { authenticate } from "../../App/actions";
import reducer from "./reducer";
// import saga from "./saga";
import { Section } from "./styles";
import { Link } from "react-router-dom";
const key = "home";
function HomeContainer({ authenticate }) {
  useEffect(() => {
    authenticate();
    return () => {};
  }, []);

  useInjectReducer({ key, reducer });
  // useInjectSaga({ key, saga });
  return (
    <div className="text-center m-2 p-2">
      <Link to="/dash"> DASHBOARD </Link>
      <h3 className="display-3">HOME BOILERPLATE</h3>
    </div>
  );
}

HomeContainer.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  username: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const mapDispatchToProps = { authenticate };
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(HomeContainer);
