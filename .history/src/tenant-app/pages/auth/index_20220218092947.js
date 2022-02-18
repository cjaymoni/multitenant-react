import React from "react";

import { InputText } from "primereact/inputtext";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser } from "../../shared/redux/actions/authActions";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    // this.setState({ submitted: true });
    const { email, password } = this.state;
    const userDetails = { email, password };

    this.props.loginUser(userDetails);
  }

  render() {
    return (
      <div>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <label htmlFor="email">Email</label>

          <InputText
            name="email"
            id="email"
            value={this.state.email}
            onChange={(e) => this.handleChange(e)}
          ></InputText>
          <br></br>
          <label htmlFor="password">Password</label>

          <InputText
            name="password"
            id="password"
            value={this.state.password}
            onChange={(e) => this.handleChange(e)}
          ></InputText>

          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
};

export default connect(null, {
  loginUser,
})(Login);
