import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import Users from "../models/UserModel.js";

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ["id", "name", "email", "role"],
    });
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

export const Register = async (req, res) => {
  const { name, email, password, confirmPassword, role } = req.body;
  if (password !== confirmPassword)
    return res.status(400).json({ msg: "Password didn't match" });
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await Users.create({
      name,
      email,
      password: hashPassword,
      role,
    });
    res.json({ msg: "Register Success" });
  } catch (error) {
    console.log(error);
  }
};

export const Login = async (req, res) => {
  try {
    const user = await Users.findAll({
      where: {
        email: req.body.email,
      },
    });

    const { id: userId, name, email, password } = user[0];

    const match = await bcrypt.compare(req.body.password, password);

    if (!match) return res.status(400).json({ msg: "Incorrect Password" });

    const accessToken = jwt.sign(
      { userId, name, email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "20s",
      }
    );

    const refreshToken = jwt.sign(
      { userId, name, email },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    await Users.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: userId,
        },
      }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
  } catch (error) {
    res.status(404).json({ msg: "Email not found" });
  }
};

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) return res.sendStatus(204);

  const user = await Users.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });

  if (!user[0]) return res.sendStatus(204);

  const { id: userId } = user[0];

  await Users.update(
    { refresh_token: null },
    {
      where: {
        id: userId,
      },
    }
  );
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};

export const getUserDetail = async (req, res) => {
  try {
    const userId = req.params.id;
    const users = await Users.findOne({
      where: {
        id: userId,
      },
    });
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await Users.destroy({
      where: {
        id: userId,
      },
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
};
