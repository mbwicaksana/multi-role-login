import Users from "../models/UserModel.js";
import argon2 from "argon2";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ msg: "User Not Found." });
    }

    if (!(await argon2.verify(user.password, password))) {
      return res.status(400).json({ msg: "Wrong Password." });
    }

    req.session.userId = user.uuid;

    res.status(200).json({
      uuid: user.uuid,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "Internal Server Error." });
  }
};

export const logoutUser = async (req, res) => {
  try {
    await req.session.destroy();
    res.status(200).json({ msg: "You've been logged out." });
  } catch (e) {
    console.error(e);
    res.status(400).json({ msg: "Can't Logout." });
  }
};

export const getMyAccount = async (req, res) => {
  try {
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

    if (!user) {
      return res.status(404).json({ msg: "User Not Found." });
    }

    res.status(200).json(user);
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "Internal Server Error." });
  }
};
