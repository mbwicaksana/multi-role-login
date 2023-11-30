import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";

// Memanggil .env
dotenv.config();

// Memanggil express
const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      // Gunakan false jika http
      // Bisa diset menjadi otomatis
      secure: "auto",
    },
  })
);

app.use(
  cors({
    // Berfungsi supaya Frontend dapat mengirimkan request beserta key dan menyertakan credential
    credentials: true,
    // Domain yang diizinkan untuk mengakses API kita (bisa berupa array)
    // React menggunakan port 3000
    origin: "http://localhost:3000",
  })
);

// Berfungsi supaya kita bisa menerima data dalam format JSON
app.use(express.json());

// APP_PORT dibuat di .env
app.listen(process.env.APP_PORT, () => {
  console.log("Server is running . . .");
});
