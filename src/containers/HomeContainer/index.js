import React, { memo } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { useInjectReducer } from "../../utils/reducer/injectReducer";
import { useInjectSaga } from "../../utils/saga/injectSaga";
import { createStructuredSelector } from "reselect";
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from "../../App/selectors";
import { makeSelectUsername } from "./selectors";
import reducer from "./reducer";
// import saga from "./saga";
import { Section } from "./styles";
import { Link } from "react-router-dom";
const key = "home";
function HomeContainer({}) {
  useInjectReducer({ key, reducer });
  // useInjectSaga({ key, saga });
  return (
    <div className="text-center m-2 p-2">
      <h3>HOME BOILERPLATE</h3>
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
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const mapDispatchToProps = {};
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(HomeContainer);
