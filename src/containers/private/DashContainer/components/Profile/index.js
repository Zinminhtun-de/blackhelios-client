import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Profile({}) {
  return (
    <div className="text-center m-2 p-2">
      {" "}
      <ul>
        <li>
          <Link to="/dash">DASHBOARD INDEX</Link>{" "}
        </li>
        <li>
          <Link to="/dash/profile">DASHBOARD PROFILE</Link>{" "}
        </li>
        <li>
          <Link to="/"> HOME</Link>{" "}
        </li>
      </ul>
      <h4 className="display-">Profile</h4>
    </div>
  );
}

Profile.propTypes = {};

export default Profile;
