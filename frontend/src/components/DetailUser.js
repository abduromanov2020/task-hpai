import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Navbar from "./Navbar";

const DetailUser = () => {
  const [user, setUser] = useState("");

  const { id } = useParams();

  console.log(id);

  const getUsers = async () => {
    const res = await axios.get(`http://localhost:5000/users/${id}`);
    console.log(res.data);
    setUser(res.data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <section className="hero is-fullheight is-fullwidth">
      <Navbar />
      <div className="hero-body has-background-grey-light">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4-desktop">
              <div className="box">
                <div class="table-container">
                  <h1 className="title has-text-centered">Detail User</h1>
                  <table class="table is-fullwidth">
                    <tbody>
                      <tr>
                        <td>Nama</td>
                        <td>:</td>
                        <td>{user.name}</td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>:</td>
                        <td>{user.email}</td>
                      </tr>
                      <tr>
                        <td>Role</td>
                        <td>:</td>
                        <td>{user.role}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailUser;
