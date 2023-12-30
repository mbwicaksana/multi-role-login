import Users from "../models/UserModel.js";
import argon2 from "argon2";

export const login = async (req, res) => {
  const user = await Users.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (!user) return res.status(404).json({ msg: "User Not Found." });
};

export const logout = async (req, res) => {
  req.session.destroy((e) => {
    if (e) return res.status(400).json({ msg: "Can't Logout." });
    res.status(200).json({ msg: "You've been logged out." });
  });
};

export const myAccount = async (req, res) => {
  console.log(req.session);

  if (!req.session.userId)
    return res
      .status(401)
      .json({ msg: "Please login into your account first." });

  const user = await Users.findOne({
    attributes: ["uuid", "name", "email", "role"],
    where: {
      uuid: req.session.userId,
    },
  });

  if (!user) return res.status(404).json({ msg: "User Not Found." });

  res.status(200).json(user);
};
