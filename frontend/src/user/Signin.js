import React, { useState } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";

import { signin, isAuthenticated, authenticate } from "../auth/helper";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, loading, didRedirect, error } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        }
      })
      .catch(console.log("Signin request failed!"));
  };

  const performRedirect = () => {
    //TODO: do a rediretion here
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="row">
          <div className="col md-6 offset-sm-3 text-left">
            <div className="alert alert-info">
              <h2>Loading...</h2>
            </div>
          </div>
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <lable className="text-white">Email</lable>
              <input
                onChange={handleChange("email")}
                value={email}
                className="form-control my-1"
                type="email"
                required
              />
            </div>
            <div className="form-group">
              <lable className="text-white">Password</lable>
              <input
                onChange={handleChange("password")}
                value={password}
                className="form-control my-1"
                type="password"
                required
              />
            </div>
            <button
              onClick={onSubmit}
              className="btn btn-success btn-block my-2 rounded"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Signin" description="Login using username and password">
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
      {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
    </Base>
  );
};

export default Signin;
