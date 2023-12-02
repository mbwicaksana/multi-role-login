import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import SequelizeStore from "connect-session-sequelize";
import db from "./config/Database.js"; // Komentari baris ini jika tidak digunakan
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import AuthRoute from "./routes/AuthRoute.js";

// Memanggil konfigurasi dari file .env
dotenv.config();

// Membuat aplikasi Express
const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

// Inisialisasi pembuatan tabel User dan Product pertama kali ke MySQL
// (async () => {
//   await db.sync();
// })();

// Menggunakan session untuk menyimpan data sesi pengguna
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      // Gunakan "auto" jika HTTPS, "false" jika HTTP
      secure: "auto",
    },
  })
);

// Menggunakan middleware CORS untuk mengizinkan akses dari origin tertentu
app.use(
  cors({
    // Mengizinkan kredensial (misalnya, cookies) untuk dikirim
    credentials: true,
    // Domain yang diizinkan untuk mengakses API kita (bisa berupa array)
    origin: "http://localhost:3000", // Ganti dengan origin yang sesuai
  })
);

// Menggunakan middleware untuk mengizinkan parsing data JSON
app.use(express.json());

// Menggunakan middleware untuk routes User dan Product
app.use(UserRoute);
app.use(ProductRoute);
app.use(AuthRoute);

// store.sync();

// Mendengarkan pada port yang ditentukan di file .env
app.listen(process.env.APP_PORT, () => {
  console.log("Server is running on port " + process.env.APP_PORT);
});
