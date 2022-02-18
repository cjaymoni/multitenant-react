import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="flex">
        <h1>Home Page</h1>
        <NavLink to="/home" style={style}>
          Home
        </NavLink>
        <NavLink to="/users" style={style}>
          Users
        </NavLink>
      </div>
    );
  }
}

export default Home;
const style = ({ isActive }) => ({
  fontWeight: isActive ? "bold" : "normal",
});
