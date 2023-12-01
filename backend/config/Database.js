// Import library Sequelize untuk berinteraksi dengan database
import { Sequelize } from "sequelize";

// Membuat instance Sequelize untuk berinteraksi dengan database MySQL
const db = new Sequelize("auth_db", "root", "", {
  host: "localhost", // Ganti dengan host database Anda
  dialect: "mysql", // Menentukan jenis database yang digunakan (dalam hal ini, MySQL)
});

// Export instance Sequelize yang telah dikonfigurasi
export default db;
