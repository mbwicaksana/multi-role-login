import Users from "../models/UserModel.js";
import argon2 from "argon2";

/**
 * Controller untuk proses login pengguna.
 * @param {Object} req - Objek permintaan (request) dari klien.
 * @param {Object} res - Objek respons (response) yang akan dikirimkan ke klien.
 */
export const Login = async (req, res) => {
  // Mencari pengguna berdasarkan alamat email
  const user = await Users.findOne({
    where: {
      email: req.body.email,
    },
  });

  // Memeriksa apakah pengguna ditemukan dalam database
  if (!user) return res.status(404).json({ msg: "User Not Found." });

  // Memverifikasi kecocokan password menggunakan argon2
  const matchPassword = await argon2.verify(user.password, req.body.password);

  // Memeriksa apakah password cocok
  if (!matchPassword) return res.status(400).json({ msg: "Wrong Password." });

  // Menyimpan ID pengguna ke dalam sesi (session)
  req.session.userId = user.uuid;

  // Mendapatkan data pengguna yang akan dikirimkan sebagai respons
  const { uuid, name, email, role } = user;
  res.status(200).json({ uuid, name, email, role });
};

/**
 * Controller untuk mendapatkan data pengguna yang sedang login.
 * @param {Object} req - Objek permintaan (request) dari klien.
 * @param {Object} res - Objek respons (response) yang akan dikirimkan ke klien.
 */
export const Me = async (req, res) => {
  // Memeriksa apakah pengguna sudah login
  if (!req.session.userId) {
    return res
      .status(401)
      .json({ msg: "Please login into your account first." });
  }

  // Mencari pengguna berdasarkan ID yang disimpan dalam sesi
  const user = await Users.findOne({
    attributes: ["uuid", "name", "email", "role"],
    where: {
      uuid: req.session.userId,
    },
  });

  // Memeriksa apakah pengguna ditemukan dalam database
  if (!user) return res.status(404).json({ msg: "User Not Found." });

  // Mengirimkan data pengguna sebagai respons
  res.status(200).json(user);
};

/**
 * Controller untuk proses logout pengguna.
 * @param {Object} req - Objek permintaan (request) dari klien.
 * @param {Object} res - Objek respons (response) yang akan dikirimkan ke klien.
 */
export const logOut = (req, res) => {
  // Menghancurkan sesi (logout)
  req.session.destroy((e) => {
    if (e) return res.status(400).json({ msg: "Can't log out." });
    res.status(200).json({ msg: "You have been logged out." });
  });
};
