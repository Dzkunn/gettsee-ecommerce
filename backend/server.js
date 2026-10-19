require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'getsee_secret_default_key_2026';

// Middleware
app.use(cors());
app.use(express.json());

// Melayani file frontend (HTML, CSS, JS, Assets) langsung dari server
const rootDir = fs.existsSync(path.join(__dirname, '..', 'index.html'))
  ? path.join(__dirname, '..')
  : __dirname;

app.use(express.static(rootDir));

// Database Connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL && process.env.DATABASE_URL.includes('railway')
    ? { rejectUnauthorized: false }
    : false
});

// Otomatis bikin tabel users, orders, dan profile saat server pertama kali menyala
async function initDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(120),
        email VARCHAR(120) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) DEFAULT 'customer',
        birth_date VARCHAR(30),
        gender VARCHAR(30),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      -- Pastikan kolom role ada jika tabel sudah pernah dibuat sebelumnya
      DO $$ 
      BEGIN 
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='role') THEN 
          ALTER TABLE users ADD COLUMN role VARCHAR(20) DEFAULT 'customer'; 
        END IF; 
      END $$;

      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        pickup_code VARCHAR(30) NOT NULL,
        email VARCHAR(120),
        items JSONB NOT NULL,
        total_amount INT NOT NULL,
        payment_method VARCHAR(50),
        status VARCHAR(30) DEFAULT 'paid',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS menu_stock (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(120),
        category VARCHAR(50),
        is_available BOOLEAN DEFAULT true,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Otomatis buat akun Kasir & PIN default jika belum ada
    const cashierCheck = await pool.query("SELECT id FROM users WHERE email = 'kasir@getsee.coffee'");
    if (cashierCheck.rows.length === 0) {
      const cashierHash = await bcrypt.hash('kasir123', 10);
      await pool.query(
        "INSERT INTO users (name, email, password, role) VALUES ('Kasir Getsee', 'kasir@getsee.coffee', $1, 'cashier')",
        [cashierHash]
      );
      console.log('🔑 Akun Kasir Default Dibuat: kasir@getsee.coffee / kasir123 (PIN: 1234)');
    }

    console.log('✅ PostgreSQL Getsee: Tabel users, orders, & menu_stock siap digunakan!');
  } catch (err) {
    console.error('❌ Gagal inisialisasi tabel database:', err.message);
  }
}
initDatabase();

// Middleware verifikasi JWT Token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Akses ditolak. Token tidak ditemukan.' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Sesi kedaluwarsa atau token tidak valid.' });
    }
    req.user = user;
    next();
  });
}

// Middleware Khusus Hak Akses Kasir / Admin
function requireCashierAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const cashierPin = req.headers['x-cashier-pin'];

  // Boleh masuk jika memasukkan PIN kasir cepat (1234) atau token role cashier
  if (cashierPin === '1234' || cashierPin === (process.env.CASHIER_PIN || '1234')) {
    req.user = { email: 'kasir@getsee.coffee', role: 'cashier' };
    return next();
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Akses Ditolak: Khusus Kasir & Karyawan Getsee.' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err || (user.role !== 'cashier' && user.role !== 'admin')) {
      return res.status(403).json({ success: false, message: 'Akses Dilarang: Akun Anda tidak memiliki hak akses Kasir.' });
    }
    req.user = user;
    next();
  });
}

// -------------------------------------------------------------
// ROUTES & ENDPOINTS
// -------------------------------------------------------------

// Root check / Serve index.html
app.get('/', (req, res) => {
  const indexPath = path.join(rootDir, 'index.html');
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }
  res.json({
    status: 'online',
    service: 'Getsee Coffee & Donuts API',
    version: '1.0.0'
  });
});

// 1. REGISTER
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const cleanEmail = String(email || '').trim().toLowerCase();

    if (!cleanEmail || !password) {
      return res.status(400).json({ success: false, message: 'Email dan password wajib diisi.' });
    }

    const checkUser = await pool.query('SELECT id FROM users WHERE email = $1', [cleanEmail]);
    if (checkUser.rows.length > 0) {
      return res.status(400).json({ success: false, message: 'Email ini sudah terdaftar. Silakan login.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, created_at',
      [name || cleanEmail.split('@')[0], cleanEmail, hashedPassword]
    );

    const user = result.rows[0];
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '30d' });

    res.json({
      success: true,
      message: 'Registrasi berhasil!',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    console.error('Error register:', err);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server.' });
  }
});

// 2. LOGIN
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const cleanEmail = String(email || '').trim().toLowerCase();

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [cleanEmail]);
    if (result.rows.length === 0) {
      return res.status(400).json({ success: false, message: 'Email tidak ditemukan.' });
    }

    const user = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ success: false, message: 'Password salah. Periksa kembali sandi Anda.' });
    }

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role || 'customer' }, JWT_SECRET, { expiresIn: '30d' });

    res.json({
      success: true,
      message: 'Login berhasil!',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role || 'customer',
        birthDate: user.birth_date,
        gender: user.gender
      }
    });
  } catch (err) {
    console.error('Error login:', err);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server.' });
  }
});

// 3. GET PROFILE
app.get('/api/auth/profile', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, email, birth_date, gender, created_at FROM users WHERE id = $1', [req.user.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'User tidak ditemukan.' });
    }
    const user = result.rows[0];
    res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        birthDate: user.birth_date,
        gender: user.gender,
        createdAt: user.created_at
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 4. UPDATE PROFILE
app.put('/api/auth/profile', authenticateToken, async (req, res) => {
  try {
    const { name, birthDate, gender } = req.body;
    const result = await pool.query(
      `UPDATE users 
       SET name = COALESCE($1, name), 
           birth_date = COALESCE($2, birth_date), 
           gender = COALESCE($3, gender), 
           updated_at = CURRENT_TIMESTAMP 
       WHERE id = $4 
       RETURNING id, name, email, birth_date, gender`,
      [name, birthDate, gender, req.user.id]
    );

    res.json({
      success: true,
      message: 'Profil berhasil diperbarui.',
      user: result.rows[0]
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 5. CREATE ORDER (PICKUP KASIR)
app.post('/api/orders', async (req, res) => {
  try {
    const { items, total_amount, payment_method, email } = req.body;
    const pickupCode = 'GET-' + Math.floor(100000 + Math.random() * 900000);

    const result = await pool.query(
      `INSERT INTO orders (pickup_code, email, items, total_amount, payment_method) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING id, pickup_code, total_amount, payment_method, created_at`,
      [pickupCode, email || 'guest', JSON.stringify(items || []), total_amount || 0, payment_method || 'QRIS']
    );

    res.json({
      success: true,
      message: 'Pesanan berhasil dibuat.',
      order: result.rows[0]
    });
  } catch (err) {
    console.error('Error create order:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// 6. GET USER ORDERS (ORDER HISTORY)
app.get('/api/orders', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM orders WHERE email = $1 ORDER BY created_at DESC LIMIT 30',
      [req.user.email]
    );
    res.json({
      success: true,
      orders: result.rows
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// -------------------------------------------------------------
// KASIR & POS APIs (PROTECTED ACCESS)
// -------------------------------------------------------------

// Verifikasi PIN Kasir (untuk login modal cepat di frontend)
app.post('/api/cashier/verify-pin', (req, res) => {
  const { pin } = req.body;
  const validPin = process.env.CASHIER_PIN || '1234';

  if (String(pin) === String(validPin)) {
    const token = jwt.sign({ email: 'kasir@getsee.coffee', role: 'cashier', name: 'Barista / Kasir' }, JWT_SECRET, { expiresIn: '12h' });
    return res.json({
      success: true,
      message: 'PIN Kasir Valid',
      token,
      user: { name: 'Barista / Kasir Getsee', email: 'kasir@getsee.coffee', role: 'cashier' }
    });
  }

  res.status(401).json({ success: false, message: 'PIN Kasir salah! Hubungi Supervisor Cafe.' });
});

// Ambil semua antrean pesanan untuk kasir
app.get('/api/cashier/orders', requireCashierAuth, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM orders ORDER BY created_at DESC LIMIT 100'
    );
    res.json({
      success: true,
      orders: result.rows
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Kasir ubah status pesanan (paid -> brewing -> ready -> completed / canceled)
app.put('/api/cashier/orders/:pickupCode/status', requireCashierAuth, async (req, res) => {
  try {
    const { pickupCode } = req.params;
    const { status } = req.body;
    const result = await pool.query(
      'UPDATE orders SET status = $1 WHERE pickup_code = $2 RETURNING *',
      [status, pickupCode]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Pesanan tidak ditemukan.' });
    }

    res.json({
      success: true,
      message: `Status pesanan ${pickupCode} diubah menjadi ${status}.`,
      order: result.rows[0]
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Kasir buat pesanan Walk-in / Dine-in langsung (POS Kasir Offline)
app.post('/api/cashier/orders', requireCashierAuth, async (req, res) => {
  try {
    const { customer_name, table_number, items, total_amount, payment_method } = req.body;
    const pickupCode = 'POS-' + Math.floor(100000 + Math.random() * 900000);
    const orderNote = table_number ? `Dine-in (Meja ${table_number}) - ${customer_name || 'Tamu'}` : `Walk-in - ${customer_name || 'Tamu'}`;

    const result = await pool.query(
      `INSERT INTO orders (pickup_code, email, items, total_amount, payment_method, status) 
       VALUES ($1, $2, $3, $4, $5, 'paid') 
       RETURNING *`,
      [pickupCode, orderNote, JSON.stringify(items || []), total_amount || 0, payment_method || 'CASH']
    );

    res.json({
      success: true,
      message: 'Pesanan kasir berhasil dicatat.',
      order: result.rows[0]
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Ambil status stok menu (habis / tersedia)
app.get('/api/menu/stock', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM menu_stock');
    res.json({
      success: true,
      stock: result.rows
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Kasir toggle stok menu (Habis / Tersedia)
app.post('/api/menu/stock/toggle', async (req, res) => {
  try {
    const { id, name, category, is_available } = req.body;
    const result = await pool.query(
      `INSERT INTO menu_stock (id, name, category, is_available, updated_at) 
       VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)
       ON CONFLICT (id) 
       DO UPDATE SET is_available = $4, updated_at = CURRENT_TIMESTAMP
       RETURNING *`,
      [id, name, category, is_available]
    );

    res.json({
      success: true,
      message: `Status menu ${name} diperbarui.`,
      item: result.rows[0]
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`☕ Getsee Server siap beroperasi di port ${port}`);
});
