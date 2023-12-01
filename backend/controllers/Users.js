import Users from "../models/UserModel.js";
import argon2 from "argon2";

export const getUsers = async (req, res) => {
  try {
    // Mendapatkan daftar pengguna dari database dengan atribut tertentu
    const response = await Users.findAll({
      attributes: ["uuid", "name", "email", "role"],
    });
    // Mengirim respons JSON dengan daftar pengguna
    res.status(200).json(response);
  } catch (e) {
    // Mengirim respons JSON dengan pesan kesalahan jika terjadi masalah
    res.status(500).json({ msg: e.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    // Mencari satu pengguna berdasarkan ID dengan atribut tertentu
    const response = await Users.findOne({
      attributes: ["uuid", "name", "email", "role"],
      where: {
        uuid: req.params.id,
      },
    });
    // Mengirim respons JSON dengan data pengguna yang sesuai dengan ID
    res.status(200).json(response);
  } catch (e) {
    // Mengirim respons JSON dengan pesan kesalahan jika terjadi masalah
    res.status(500).json({ msg: e.message });
  }
};

export const createUser = async (req, res) => {
  // Destructuring body permintaan untuk mendapatkan data pengguna
  const { name, email, password, confirmPassword, role } = req.body;

  // Memeriksa apakah kata sandi cocok dengan konfirmasi kata sandi
  if (password !== confirmPassword)
    return res.status(400).json({ msg: "Password doesn't match." });

  // Hashing kata sandi menggunakan argon2
  const hashPassword = await argon2.hash(password);

  try {
    // Membuat pengguna baru dalam database
    await Users.create({
      name: name,
      email: email,
      password: hashPassword,
      role: role,
    });
    // Mengirim respons JSON bahwa pendaftaran pengguna berhasil
    res.status(201).json({ msg: "Registration Success !" });
  } catch (e) {
    // Mengirim respons JSON dengan pesan kesalahan jika terjadi masalah
    res.status(400).json({ msg: e.message });
  }
};

export const updateUser = async (req, res) => {
  // Mencari pengguna berdasarkan ID
  const user = await Users.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  // Memeriksa apakah pengguna ditemukan dalam database
  if (!user) return res.status(404).json({ msg: "User Not Found." });

  // Destructuring body permintaan untuk mendapatkan data pengguna yang diperbarui
  const { name, email, password, confirmPassword, role } = req.body;

  let hashPassword;

  // Memeriksa apakah pengguna menginput kata sandi baru
  if (password === "" || password === null) {
    // Menggunakan kata sandi yang ada dalam database jika pengguna tidak menginput kata sandi baru
    hashPassword = user.password;
  } else {
    // Hashing kata sandi baru menggunakan argon2
    hashPassword = await argon2.hash(password);
  }

  // Pengecekan apakah kata sandi sama dengan konfirmasi kata sandi
  if (password !== confirmPassword)
    return res.status(400).json({ msg: "Password doesn't match." });

  try {
    // Memperbarui data pengguna dalam database
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
    // Mengirim respons JSON bahwa pengguna berhasil diperbarui
    res.status(200).json({ msg: "User Updated." });
  } catch (e) {
    // Mengirim respons JSON dengan pesan kesalahan jika terjadi masalah
    res.status(400).json({ msg: e.message });
  }
};

export const deleteUser = async (req, res) => {
  // Mencari pengguna berdasarkan ID
  const user = await Users.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  // Memeriksa apakah pengguna ditemukan dalam database
  if (!user) return res.status(404).json({ msg: "User Not Found." });

  try {
    // Menghapus pengguna dari database
    await Users.destroy({
      where: {
        id: user.id,
      },
    });
    // Mengirim respons JSON bahwa pengguna berhasil dihapus
    res.status(200).json({ msg: "User Deleted." });
  } catch (e) {
    // Mengirim respons JSON dengan pesan kesalahan jika terjadi masalah
    res.status(400).json({ msg: e.message });
  }
};
