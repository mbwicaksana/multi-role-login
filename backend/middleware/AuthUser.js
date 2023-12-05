import Users from "../models/UserModel.js";

export const verifyUser = async (req, res, next) => {
  // Memeriksa apakah pengguna sudah login
  if (!req.session.userId) {
    return res
      .status(401)
      .json({ msg: "Please login into your account first." });
  }

  // Mencari pengguna berdasarkan ID yang disimpan dalam sesi
  const user = await Users.findOne({
    where: {
      uuid: req.session.userId,
    },
  });

  // Memeriksa apakah pengguna ditemukan dalam database
  if (!user) return res.status(404).json({ msg: "User Not Found." });

  req.userId = user.id;
  req.role = user.role;
  next();
};

export const adminOnly = async (req, res, next) => {
  // Mencari pengguna berdasarkan ID yang disimpan dalam sesi
  const user = await Users.findOne({
    where: {
      uuid: req.session.userId,
    },
  });

  // Memeriksa apakah pengguna ditemukan dalam database
  if (!user) return res.status(404).json({ msg: "User Not Found." });
  if (user.role !== "admin")
    return res.status(403).json({ msg: "Access Denied." });
  next();
};
