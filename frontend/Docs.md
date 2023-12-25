**Dokumentasi Kode Frontend JavaScript**

**Struktur Umum**

Dokumentasi ini menjelaskan struktur umum kode frontend JavaScript yang dibangun menggunakan React, Redux, dan Axios.

* **Redux** digunakan untuk mengelola state aplikasi menggunakan store dan actions.
* **React Router** digunakan untuk menangani navigasi antar komponen.
* **Axios** digunakan untuk membuat permintaan API ke server backend.

**Komponen Utama**

* **Login** menangani login pengguna dan mengirimkan actions untuk autentikasi.
* **Navbar** menampilkan tautan navigasi dan fungsionalitas logout.
* **FormAddProduct** memungkinkan pembuatan produk baru dengan bidang nama dan harga.
* **FormAddUser** memungkinkan penambahan pengguna baru dengan bidang nama, email, kata sandi, konfirmasi kata sandi,
  dan peran.
* **FormEditProduct** memfasilitasi pengeditan produk yang ada.
* **FormEditUser** memungkinkan pembaruan pengguna yang ada.

**Interaksi Komponen**

* Komponen berkomunikasi menggunakan actions dan store Redux untuk mengelola state.
* Formulir menggunakan peristiwa `onSubmit` untuk menangani tindakan seperti membuat atau memperbarui data.
* Navigasi ditangani oleh fungsi `NavLink` dan `navigate` React Router.

**Interaksi API**

* Formulir membuat panggilan API menggunakan Axios untuk membuat, memperbarui, atau mengambil data.
* Asumsikan endpoint API berada di `http://localhost:5000/`.
* Penanganan kesalahan disertakan dalam panggilan API untuk menampilkan pesan kepada pengguna.

**Catatan Tambahan**

* Dokumentasi untuk kode backend dan endpoint API diperlukan untuk pemahaman yang lengkap.
* Klarifikasi lebih lanjut untuk komponen atau fungsionalitas tertentu dapat diberikan jika diperlukan.

**Penjelasan Lebih Lengkap**

Berikut adalah penjelasan lebih lengkap tentang setiap bagian dari dokumentasi:

**Struktur Umum**

* **Redux** adalah library state management yang populer untuk JavaScript. Redux menggunakan konsep state tree untuk
  mengelola state aplikasi. State tree adalah struktur data yang menyimpan data aplikasi.
* **React Router** adalah library routing yang populer untuk React. React Router memungkinkan Anda untuk membuat
  aplikasi web multi-halaman.
* **Axios** adalah library HTTP client yang populer untuk JavaScript. Axios memungkinkan Anda untuk membuat permintaan
  HTTP ke server backend.

**Komponen Utama**

* **Login** adalah komponen yang menangani login pengguna. Komponen ini menggunakan action `login` Redux untuk
  mengirimkan permintaan login ke server backend.
* **Navbar** adalah komponen yang menampilkan tautan navigasi dan fungsionalitas logout. Komponen ini menggunakan
  komponen `NavLink` React Router untuk membuat tautan navigasi.
* **FormAddProduct** adalah komponen yang memungkinkan pengguna untuk membuat produk baru. Komponen ini menggunakan
  bidang input untuk mengumpulkan data produk dari pengguna. Setelah data dikumpulkan, komponen ini menggunakan
  action `createProduct` Redux untuk mengirimkan permintaan untuk membuat produk baru ke server backend.
* **FormAddUser** adalah komponen yang memungkinkan pengguna untuk menambahkan pengguna baru. Komponen ini mirip dengan
  **FormAddProduct**, tetapi mengumpulkan data pengguna dari pengguna.
* **FormEditProduct** adalah komponen yang memungkinkan pengguna untuk mengedit produk yang ada. Komponen ini
  menggunakan bidang input untuk mengumpulkan data produk yang baru dari pengguna. Setelah data dikumpulkan, komponen
  ini menggunakan action `editProduct` Redux untuk mengirimkan permintaan untuk mengedit produk ke server backend.
* **FormEditUser** adalah komponen yang mirip dengan **FormEditProduct**, tetapi mengumpulkan data pengguna yang baru
  dari pengguna.

**Interaksi Komponen**

* Komponen berkomunikasi menggunakan actions dan store Redux untuk mengelola state. Actions adalah objek yang digunakan
  untuk mengirimkan data ke store Redux. Store Redux adalah objek yang menyimpan state aplikasi.
* Formulir menggunakan peristiwa `onSubmit` untuk menangani tindakan seperti membuat atau memperbarui data.
  Peristiwa `onSubmit` terjadi ketika pengguna menekan tombol submit di formulir.
* Navigasi ditangani oleh fungsi `NavLink` dan `navigate` React Router. Fungsi `NavLink` digunakan untuk membuat tautan
  navigasi. Fungsi `navigate` digunakan untuk bernavigasi ke halaman lain dalam aplikasi.

**Interaksi API**

* Formulir membuat panggilan API menggunakan Axios untuk membuat, memperbarui, atau mengambil data. Axios adalah library
  HTTP client yang populer untuk JavaScript.
* Asumsikan endpoint API berada di `http://localhost:5000/`. Endpoint API adalah alamat URL yang digunakan untuk membuat
  permintaan API.
* Penanganan kesalahan disertakan dalam panggilan API untuk menampilkan pesan kepada pengguna. Penanganan kesalahan
  adalah proses menangani kesalahan yang terjadi saat membuat permintaan API.