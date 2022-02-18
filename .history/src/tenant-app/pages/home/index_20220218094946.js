import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Can from "../../../shared/casl/can";
import { NavButton } from "./const";

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
        <br></br>
        <NavLink to="/users" style={style}>
          Users
        </NavLink>
        <br></br>
        <Can do="view" on="Asset">
          <NavButton />
        </Can>
      </div>
    );
  }
}

export default Home;
const style = ({ isActive }) => ({
  fontWeight: isActive ? "bolder" : "normal",
  fontColor: isActive ? "green" : "red",
  fontSize: isActive ? "30px" : "10px",
  background: isActive ? "#ADD8E6" : "",
});
