import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "./Navbar";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState(null);

  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const handleAddUser = async (e) => {
    e.preventDefault();

    if (role == null) {
      return setMsg("please select Role");
    }

    try {
      await axios.post("http://localhost:5000/users", {
        name,
        email,
        password,
        confirmPassword,
        role,
      });
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
      console.log(error);
    }
  };

  return (
    <section className="hero  is-fullheight is-fullwidth">
      <Navbar />
      <div className="hero-body has-background-grey-light">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4-desktop">
              <form className="box" onSubmit={handleAddUser}>
                <h1 className="title">Add User</h1>
                <div className="field mt-5">
                  <label className="label">Username</label>
                  <div className="controls">
                    <input
                      type="text"
                      className="input"
                      placeholder="Username"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <label className="label">Email</label>
                  <div className="controls">
                    <input
                      type="email"
                      className="input"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
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
                      required
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <label className="label">Confirm Password</label>
                  <div className="controls">
                    <input
                      type="password"
                      className="input"
                      placeholder="*******"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <label className="label">Role</label>
                  <div class="select">
                    <select onChange={(e) => setRole(e.target.value)} required>
                      <option>Select Role</option>
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </div>
                </div>
                <p className="">{msg}</p>
                <div className="field mt-5">
                  <button className="button is-success is-fullwidth">
                    Add User
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

export default CreateUser;
