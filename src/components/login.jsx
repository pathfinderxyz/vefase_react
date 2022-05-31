import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <div className="container">
        <div className="row">
        <div className="col-sm-4 offset-4 mt-5">
        <div className="card">
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              USUARIO
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="user"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              CLAVE
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="pass"
            />
          </div>
          <Link to="/inicio" className="btn btn-dark btn-lg btn-block ">
            Entrar
          </Link>
          </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Login;
