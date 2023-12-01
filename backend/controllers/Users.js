import User from "../models/UserModel.js";
import argon2 from "argon2";

export const getUsers = async (req, res) => {
  try {
    const response = await User.findAll({
      // Attribute yang ingin ditampilkan saat mengirim request
      attributes: ["uuid", "name", "email", "role"],
    });
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const response = await User.findOne({
      // Attribute yang ingin ditampilkan saat mengirim request
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
  // Destructuring request body
  const { name, email, password, confirmPassword, role } = req.body;

  if (password !== confirmPassword)
    return res.status(400).json({ msg: "Password doesn't match." });

  // Hashing password menggunakan argon2
  const hashPassword = await argon2.hash(password);

  try {
    await User.create({
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
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  // Mengecek apakah User ada di database
  if (!user) return res.status(404).json({ msg: "User Not Found." });

  // Destructuring Request Body
  const { name, email, password, confirmPassword, role } = req.body;

  let hashPassword;

  if (password === "" || password === null) {
    // Set Password menjadi Password semula yang ada di database jika user tidak input password baru
    hashPassword = user.password;
  } else {
    // Set password baru. Ambil data password baru dari Request Body yang sudah di destructure
    hashPassword = await argon2.hash(password);
  }

  // Pengecekan jika password tidak sama dengan confirmPassword
  if (password !== confirmPassword)
    return res.status(400).json({ msg: "Password doesn't match." });

  // Update data user dengan nilai password = hashPassword
  try {
    await User.update(
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
    res.status(200).json({ msg: "User Updated." });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

export const deleteUser = async (req, res) => {};
