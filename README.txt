GETSEE Coffee & Donuts — Multi-file Static Website

Cara preview:
1. Extract ZIP ini.
2. Buka index.html di browser.
3. Klik card menu, misalnya Burger, maka akan membuka menu.html?category=burger di tab baru.
4. Di menu.html, list Burger tampil di kiri dan semua kategori menu tampil sebagai teks di kanan.

Struktur:
- index.html: halaman utama
- menu.html: full menu per kategori
- css/style.css: styling utama
- js/menu-data.js: data menu dari PDF
- js/app.js: carousel dan klik card di index
- js/menu-page.js: render full menu dan sidebar
- assets/: gambar/logo
- pdf/buku-menu-fixed.pdf: PDF menu asli
- tests/menu-data.test.html: tes data menu sederhana

Catatan:
- Harganya dihapus dari card halaman utama.
- Harga tetap tampil di full menu karena mengikuti PDF.
- Ini static frontend, belum backend/database.
