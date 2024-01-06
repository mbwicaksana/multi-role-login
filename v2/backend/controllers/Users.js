import Users from "../models/UserModel.js";
import argon2 from "argon2";

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ["uuid", "name", "email", "role"],
    });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await Users.findOne({
      attributes: ["uuid", "name", "email", "role"],
      where: { uuid: req.params.id },
    });

    if (!user) {
      return res.status(404).json({ msg: "User Not Found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, role } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ msg: "Passwords do not match." });
    }

    const hashedPassword = await argon2.hash(password);

    const user = await Users.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({ msg: "User created successfully." });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(400).json({ msg: "Failed to create user." }); // Generic error message
  }
};

export const updateUser = async (req, res) => {
  try {
    const { uuid } = req.params;
    const { name, email, password, confirmPassword, role } = req.body;

    const user = await Users.findOne({ where: { uuid } });

    if (!user) {
      return res.status(404).json({ msg: "User Not Found." });
    }

    const updatedUser = { name, email, role };

    if (password !== "" && password !== null) {
      if (password !== confirmPassword) {
        return res.status(400).json({ msg: "Passwords do not match." });
      }

      updatedUser.password = await argon2.hash(password);
    }

    await Users.update(updatedUser, { where: { id: user.id } });

    res.status(200).json({ msg: "User Updated." });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ msg: "Failed to update user." }); // Generic error message
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!user) {
      return res.status(404).json({ msg: "User Not Found." });
    }

    await Users.destroy({ where: { id: user.id } });

    res.status(200).json({ msg: "User deleted." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Failed to delete user." });
  }
};
