import React, { Component } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function NoMatch() {
  let location = useLocation();
  const navigate = useNavigate();
  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
        <button onClick={() => navigate(-1)}>Go back</button>
      </h3>
    </div>
  );
}
export default NoMatch;
