import Users from "../models/UserModel.js";
import argon2 from "argon2";

export const Login = async (req, res) => {
  const user = await Users.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (!user) return res.status(404).json({ msg: "User Not Found." });

  const matchPassword = await argon2.verify(user.password, req.body.password);

  if (!matchPassword) return res.status(400).json({ msg: "Wrong Password." });

  req.session.userId = user.uuid;

  const { uuid, name, email, role } = user;
  res.status(200).json({ uuid, name, email, role });
};

export const Me = async (req, res) => {
  if (!req.session.userId) {
    return res
      .status(401)
      .json({ msg: "Please login into your account first." });
  }

  const user = await Users.findOne({
    attributes: ["uuid", "name", "email", "role"],
    where: {
      uuid: req.session.userId,
    },
  });

  if (!user) return res.status(404).json({ msg: "User Not Found." });

  res.status(200).json(user);
};

export const logOut = (req, res) => {
  req.session.destroy((e) => {
    if (e) return res.status(400).json({ msg: "Can't log out." });
    res.status(200).json({ msg: "You have been logged out." });
  });
};
