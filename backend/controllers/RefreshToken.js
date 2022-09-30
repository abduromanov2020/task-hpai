import jwt from "jsonwebtoken";

import Users from "../models/UserModel.js";

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) return res.sendStatus(401);

    const user = await Users.findAll({
      where: {
        refresh_token: refreshToken,
      },
    });

    if (!user[0]) return res.sendStatus(403);

    const { id: userId, name, email, role } = user[0];

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) return res.sendStatus(403);

        const accessToken = jwt.sign(
          { userId, name, email, role },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "15s",
          }
        );
        res.json({ accessToken });
      }
    );
  } catch (error) {
    console.log(error);
  }
};
