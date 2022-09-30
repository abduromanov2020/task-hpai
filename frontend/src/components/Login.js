import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4-desktop">
              <form className="box" onSubmit={handleLogin}>
                <h1 className="title">Login</h1>
                <div className="field mt-5">
                  <label className="label">Email</label>
                  <div className="controls">
                    <input
                      type="text"
                      className="input"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <label className="label">Password</label>
                  <div className="controls">
                    <input
                      type="password"
                      className="input"
                      placeholder="*******"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <p className="">{msg}</p>
                <div className="field mt-5">
                  <button className="button is-success is-fullwidth">
                    Login
                  </button>
                  <button
                    className="button is-success is-outlined mt-2 is-fullwidth"
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
