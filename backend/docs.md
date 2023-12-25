**Dokumentasi Cara Kerja Backend JavaScript dengan Multi Role Login dan CRUD Product**

**Struktur Aplikasi**

Aplikasi ini disusun dalam struktur MVC (Model-View-Controller) dan menggunakan framework Express.js:

* **config:** Berisi konfigurasi database dan environment variables.
    * Database.js: Mengkonfigurasi koneksi ke database MySQL.
    * .env: Menyimpan secret key dan port aplikasi.
* **controllers:** Mengandung logika untuk menangani request dan response API.
    * Auth.js: Menangani login, logout, dan informasi user.
    * Product.js: Menangani operasi CRUD produk.
    * Users.js: Menangani operasi CRUD user (hanya untuk admin).
* **middleware:** Mengandung fungsi middleware untuk autentikasi dan otorisasi.
    * AuthUser.js: Middleware untuk verifikasi login dan akses admin.
* **models:** Merepresentasikan model data yang berinteraksi dengan database.
    * ProductModel.js: Model untuk data produk.
    * UserModel.js: Model untuk data user.
* **routes:** Mendefinisikan endpoint API.
    * AuthRoute.js: Endpoint untuk autentikasi (login, logout, informasi user).
    * ProductRoute.js: Endpoint untuk operasi CRUD produk.
    * UserRoute.js: Endpoint untuk operasi CRUD user (hanya untuk admin).
* **index.js:** File utama yang menjalankan server Express.js.

**Alur Kerja**

Alur kerja aplikasi ini dapat dibagi menjadi beberapa tahap berikut:

1. **Koneksi Database:**
    * Aplikasi terhubung ke database MySQL menggunakan Sequelize.
    * File `Database.js` menginisiasi koneksi.
2. **Session Management:**
    * Express-session digunakan untuk menyimpan data session user.
    * Connect-session-sequelize menyimpan session di database MySQL.
    * File `index.js` mengaktifkan session management.
3. **Autentikasi dan Otorisasi:**
    * Middleware `verifyUser` memastikan user telah login.
    * Middleware `adminOnly` membatasi akses untuk user dengan role "admin".
4. **Endpoint API:**
    * Endpoint API didefinisikan dalam file routes.
    * Controller menangani logika untuk setiap endpoint.
5. **CRUD Produk:**
    * Endpoint untuk CRUD produk tersedia di ProductRoute.js.
    * User hanya dapat mengakses produk yang mereka buat.
    * Admin dapat mengakses semua produk.
6. **CRUD User (Admin):**
    * Endpoint untuk CRUD user hanya dapat diakses oleh admin.

**Perintah Menjalankan Aplikasi**

1. Pastikan MySQL server berjalan dan database "auth_db" sudah dibuat.
2. Install dependencies: `npm install`
3. Jalankan aplikasi: `npm start`

**Informasi Tambahan:**

* Aplikasi menggunakan port 5000 (default).
* Akses ke API dilindungi oleh CORS, hanya mengizinkan asal dari `http://localhost:3000`.

**Penjelasan Lebih Lengkap**

### Koneksi Database

Aplikasi ini menggunakan database MySQL untuk menyimpan data user dan produk. File `Database.js` menginisiasi koneksi ke
database MySQL menggunakan Sequelize.

```javascript
const {Sequelize} = require("sequelize");

const db = new Sequelize({
    host: "localhost",
    database: "auth_db",
    username: "root",
    password: "",
});

module.exports = db;
```

File `Database.js` menyimpan konfigurasi koneksi ke database MySQL dalam objek `db`. Objek `db` kemudian diekspor ke
file lain yang membutuhkannya.

### Session Management

Aplikasi ini menggunakan Express-session untuk menyimpan data session user. Session adalah data yang disimpan di server
untuk jangka waktu tertentu, biasanya digunakan untuk menyimpan informasi login user.

Express-session menyimpan session di database MySQL menggunakan Connect-session-sequelize. File `index.js` mengaktifkan
session management:

```javascript
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        store: new sessionStore({
            db: db,
        }),
        cookie: {
            // Gunakan "auto" jika HTTPS, "false" jika HTTP
            secure: "auto",
        },
    })
);
```

File `index.js` menginisiasi server Express.js dan menambahkan middleware `verifyUser` dan `adminOnly`. File ini juga
mendaftarkan endpoint API yang tersedia.

Berikut adalah potongan kode dari file `index.js`:

```javascript
const express = require("express");
const app = express();

const db = require("./config/database");
const AuthUser = require("./middleware/auth-user");
const ProductRoute = require("./routes/product-route");
const UserRoute = require("./routes/user-route");

app.use(bodyParser.json());
app.use(cors({origin: ["http://localhost:3000"]}));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new sessionStore({
        db: db,
    }),
    cookie: {
        secure: "auto",
    },
}));
app.use(AuthUser.verifyUser);
app.use(adminOnly);

app.use("/api/products", ProductRoute);
app.use("/api/users", UserRoute);

app.listen(5000, () => {
    console.log("Server started on port 5000");
});
```

File `index.js` menginisiasi Express.js dengan metode `listen()`. Metoda ini menerima port server sebagai argumen.

Kemudian, file `index.js` menambahkan middleware `bodyParser.json()` untuk memparsing request JSON.

Selanjutnya, file `index.js` menambahkan middleware `cors()` untuk mengizinkan akses dari asal tertentu.

Setelah itu, file `index.js` menambahkan middleware `session()` untuk menyimpan data session user.

Selanjutnya, file `index.js` menambahkan middleware `AuthUser.verifyUser()` untuk memastikan user telah login.

Terakhir, file `index.js` menambahkan middleware `adminOnly()` untuk membatasi akses untuk user dengan role "admin".

Setelah semua middleware ditambahkan, file `index.js` mendaftarkan endpoint API yang tersedia. Endpoint API didaftarkan
dengan metode `use()`.

### Autentikasi dan Otorisasi

Aplikasi ini menggunakan middleware untuk autentikasi dan otorisasi. Middleware `verifyUser` memastikan user telah
login. Middleware `adminOnly` membatasi akses untuk user dengan role "admin".

File `AuthUser.js` mendefinisikan middleware `verifyUser`:

```javascript
const {Sequelize} = require("sequelize");

module.exports = (req, res, next) => {
    const user = req.session.user;

    if (!user) {
        res.status(401).send("Unauthorized");
        return;
    }

    next();
};
```

Middleware `verifyUser` memeriksa apakah user telah login. Jika belum, maka middleware akan mengembalikan kode status
401 (Unauthorized).

File `AuthUser.js` juga mendefinisikan middleware `adminOnly`:

```javascript
const {Sequelize} = require("sequelize");

module.exports = (req, res, next) => {
    const user = req.session.user;

    if (!user || user.role !== "admin") {
        res.status(403).send("Forbidden");
        return;
    }

    next();
};
```

Middleware `adminOnly` memeriksa apakah user memiliki role "admin". Jika tidak, maka middleware akan mengembalikan kode
status 403 (Forbidden).

### Endpoint API

Aplikasi ini menyediakan berbagai endpoint API untuk melakukan operasi CRUD produk dan user.

**Endpoint API untuk autentikasi**

* `POST /login`
    * Mengirimkan data login user
    * Mengembalikan token session jika login berhasil
* `DELETE /logout`
    * Menghapus token session

**Endpoint API untuk CRUD produk**

* `GET /products`
    * Mengembalikan daftar semua produk
* `GET /products/:id`
    * Mengembalikan produk dengan ID tertentu
* `POST /products`
    * Menambahkan produk baru
* `PATCH /products/:id`
    * Mengubah produk dengan ID tertentu
* `DELETE /products/:id`
    * Menghapus produk dengan ID tertentu

**Endpoint API untuk CRUD user (admin)**

* `GET /users`
    * Mengembalikan daftar semua user
* `GET /users/:id`
    * Mengembalikan user dengan ID tertentu
* `POST /users`
    * Menambahkan user baru
* `PATCH /users/:id`
    * Mengubah user dengan ID tertentu
* `DELETE /users/:id`
    * Menghapus user dengan ID tertentu

**Endpoint API untuk autentikasi**

Endpoint API untuk autentikasi digunakan untuk login dan logout user.

Endpoint `POST /login` menerima data login user, yaitu email dan password. Jika data login valid, maka
middleware `verifyUser` akan mengembalikan token session. Token session kemudian dapat digunakan untuk mengakses
endpoint API lainnya.

Endpoint `DELETE /logout` menghapus token session.

**Endpoint API untuk CRUD produk**

Endpoint API untuk CRUD produk digunakan untuk mengelola produk.

Endpoint `GET /products` mengembalikan daftar semua produk. Endpoint ini dapat diakses oleh semua user.

Endpoint `GET /products/:id` mengembalikan produk dengan ID tertentu. Endpoint ini dapat diakses oleh semua user.

Endpoint `POST /products` menambahkan produk baru. Endpoint ini hanya dapat diakses oleh user dengan role "admin".

Endpoint `PATCH /products/:id` mengubah produk dengan ID tertentu. Endpoint ini hanya dapat diakses oleh user dengan
role "admin".

Endpoint `DELETE /products/:id` menghapus produk dengan ID tertentu. Endpoint ini hanya dapat diakses oleh user dengan
role "admin".

**Endpoint API untuk CRUD user (admin)**

Endpoint API untuk CRUD user hanya dapat diakses oleh admin.

Endpoint `GET /users` mengembalikan daftar semua user.

Endpoint `GET /users/:id` mengembalikan user dengan ID tertentu.

Endpoint `POST /users` menambahkan user baru.

Endpoint `PATCH /users/:id` mengubah user dengan ID tertentu.

Endpoint `DELETE /users/:id` menghapus user dengan ID tertentu.

### Kesimpulan

Aplikasi ini menggunakan struktur MVC (Model-View-Controller) dan framework Express.js. Aplikasi ini menyediakan
berbagai endpoint API untuk melakukan operasi CRUD produk dan user. Endpoint API untuk autentikasi dan otorisasi
menggunakan middleware untuk memastikan user telah login dan memiliki role yang sesuai.
