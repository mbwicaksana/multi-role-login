import Users from "../models/UserModel.js";
import argon2 from "argon2";

export const getUsers = async (req, res) => {
  try {
    const response = await Users.findAll({
      attributes: ["uuid", "name", "email", "role"],
    });
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const response = await Users.findOne({
      attributes: ["uuid", "name", "email", "role"],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
};

export const createUser = async (req, res) => {
  const { name, email, password, confirmPassword, role } = req.body;

  if (password !== confirmPassword)
    return res.status(400).json({ msg: "Password doesn't match." });

  const hashPassword = await argon2.hash(password);

  try {
    await Users.create({
      name: name,
      email: email,
      password: hashPassword,
      role: role,
    });
    res.status(201).json({ msg: "Registration Success !" });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

export const updateUser = async (req, res) => {
  const user = await Users.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!user) return res.status(404).json({ msg: "User Not Found." });

  const { name, email, password, confirmPassword, role } = req.body;
  let hashPassword;

  if (password === "" || password === null) {
    hashPassword = user.password;
  } else {
    hashPassword = await argon2.hash(password);
  }

  if (password !== confirmPassword)
    return res.status(400).json({ msg: "Password doesn't match." });

  // cek kenapa pakai user.id dan bukan user.uuid
  // console.log(user.id);
  // console.log(user.uuid);

  try {
    await Users.update(
      {
        name: name,
        email: email,
        password: hashPassword,
        role: role,
      },
      {
        where: {
          id: user.id,
        },
      }
    );

    res.status(200).json({ msg: " User Updated." });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

export const deleteUser = async (req, res) => {
  const user = await Users.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!user) return res.status(404).json({ msg: "User Not Found." });

  // cek kenapa pakai user.id dan bukan user.uuid
  // console.log(user.id);
  // console.log(user.uuid);

  try {
    await Users.destroy({
      where: {
        id: user.id,
      },
    });

    res.status(200).json({ msg: " User deleted." });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};
