import React, { useEffect, useState } from "react";

import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [role, setRole] = useState("");

  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const refreshToken = async () => {
    try {
      const res = await axios.get("http://localhost:5000/token");

      setToken(res.data.accessToken);

      const decoded = jwt_decode(res.data.accessToken);

      setName(decoded.name);
      setRole(decoded.role);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        navigate("/");
      }
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const res = await axios.get("http://localhost:5000/token");

        config.headers.Authorization = `Bearer ${res.data.accessToken}`;

        setToken(res.data.accessToken);

        const decoded = jwt_decode(res.data.accessToken);

        setRole(decoded.role);
        setName(decoded.name);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const getUsers = async () => {
    const res = await axiosJWT.get("http://localhost:5000/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUsers(res.data);
  };

  const handleDetail = (id) => {
    navigate(`/detail/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure want to delete this user?")) {
      await axios.delete(`http://localhost:5000/users/${id}`);
    }

    getUsers();
  };

  useEffect(() => {
    refreshToken();
    getUsers();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="title">Welcome Back , {name}</h1>
      <Link to="/create">
        <button className="button is-info">Add User</button>
      </Link>
      <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth mt-5">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button
                  onClick={() => handleDetail(user.id)}
                  class="button is-success mr-2"
                >
                  Detail
                </button>
                {role == "admin" && (
                  <button
                    onClick={() => handleDelete(user.id)}
                    class="button is-danger"
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
