# Getsee Coffee & Donuts - Fullstack Python Backend & Static Server
import http.server
import socketserver
import json
import sqlite3
import hashlib
import os
import secrets
from datetime import datetime, timedelta
from urllib.parse import urlparse

PORT = 8000
DB_FILE = os.path.join(os.path.dirname(__file__), 'getsee.db')

def init_db():
    conn = sqlite3.connect(DB_FILE)
    cur = conn.cursor()
    cur.execute('''CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        salt TEXT NOT NULL,
        created_at TEXT NOT NULL
    )''')
    cur.execute('''CREATE TABLE IF NOT EXISTS sessions (
        token TEXT PRIMARY KEY,
        user_id INTEGER NOT NULL,
        expires_at TEXT NOT NULL
    )''')
    cur.execute('''CREATE TABLE IF NOT EXISTS orders (
        id TEXT PRIMARY KEY,
        user_id INTEGER,
        customer_name TEXT,
        customer_email TEXT,
        items_json TEXT NOT NULL,
        total_amount REAL NOT NULL,
        payment_method TEXT NOT NULL,
        status TEXT NOT NULL,
        created_at TEXT NOT NULL
    )''')
    conn.commit()

    cur.execute('SELECT COUNT(*) FROM users')
    if cur.fetchone()[0] == 0:
        salt = secrets.token_hex(16)
        pwd_hash = hashlib.sha256((salt + ':getsee123').encode('utf-8')).hexdigest()
        cur.execute(
            'INSERT INTO users (name, email, password_hash, salt, created_at) VALUES (?, ?, ?, ?, ?)',
            ('Pelanggan Setia Getsee', 'customer@getsee.coffee', pwd_hash, salt, datetime.now().isoformat())
        )
        conn.commit()
    conn.close()

def hash_pwd(password, salt):
    return hashlib.sha256((salt + ':' + password).encode('utf-8')).hexdigest()

class GetseeAPIHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def send_json(self, data, status=200):
        response_bytes = json.dumps(data).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', str(len(response_bytes)))
        self.end_headers()
        self.wfile.write(response_bytes)

    def read_json_body(self):
        content_length = int(self.headers.get('Content-Length', 0))
        if content_length == 0:
            return {}
        body = self.rfile.read(content_length)
        try:
            return json.loads(body.decode('utf-8'))
        except Exception:
            return {}

    def get_auth_user(self):
        auth_header = self.headers.get('Authorization', '')
        token = ''
        if auth_header.startswith('Bearer '):
            token = auth_header[7:].strip()
        if not token:
            cookie_header = self.headers.get('Cookie', '')
            for part in cookie_header.split(';'):
                if 'getsee_token=' in part:
                    token = part.split('getsee_token=')[1].strip()
        if not token:
            return None

        conn = sqlite3.connect(DB_FILE)
        cur = conn.cursor()
        cur.execute('''SELECT u.id, u.name, u.email 
            FROM sessions s 
            JOIN users u ON s.user_id = u.id 
            WHERE s.token = ? AND s.expires_at > ?''',
            (token, datetime.now().isoformat()))
        row = cur.fetchone()
        conn.close()
        if row:
            return {'id': row[0], 'name': row[1], 'email': row[2], 'token': token}
        return None

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path

        if path == '/api/health':
            self.send_json({'status': 'ok', 'server': 'Getsee Python Backend v2.0', 'time': datetime.now().isoformat()})
            return

        if path == '/api/auth/me':
            user = self.get_auth_user()
            if not user:
                self.send_json({'authenticated': False, 'message': 'Belum login. Silakan login terlebih dahulu.'}, 401)
                return
            self.send_json({'authenticated': True, 'user': user})
            return

        if path == '/api/orders':
            user = self.get_auth_user()
            conn = sqlite3.connect(DB_FILE)
            cur = conn.cursor()
            if user:
                cur.execute('SELECT id, customer_name, customer_email, items_json, total_amount, payment_method, status, created_at FROM orders WHERE user_id = ? ORDER BY created_at DESC', (user['id'],))
            else:
                cur.execute('SELECT id, customer_name, customer_email, items_json, total_amount, payment_method, status, created_at FROM orders ORDER BY created_at DESC LIMIT 10')
            rows = cur.fetchall()
            conn.close()
            orders = []
            for r in rows:
                orders.append({
                    'id': r[0],
                    'customer_name': r[1],
                    'customer_email': r[2],
                    'items': json.loads(r[3]),
                    'total_amount': r[4],
                    'payment_method': r[5],
                    'status': r[6],
                    'created_at': r[7]
                })
            self.send_json({'orders': orders})
            return

        return super().do_GET()

    def do_POST(self):
        parsed = urlparse(self.path)
        path = parsed.path

        if path == '/api/auth/register':
            data = self.read_json_body()
            name = str(data.get('name', '')).strip()
            email = str(data.get('email', '')).strip().lower()
            password = str(data.get('password', ''))

            if not name:
                self.send_json({'success': False, 'message': 'Nama lengkap wajib diisi.'}, 400)
                return
            if not email or '@' not in email:
                self.send_json({'success': False, 'message': 'Alamat email tidak valid.'}, 400)
                return
            if len(password) < 4:
                self.send_json({'success': False, 'message': 'Password minimal 4 karakter.'}, 400)
                return

            conn = sqlite3.connect(DB_FILE)
            cur = conn.cursor()
            cur.execute('SELECT id FROM users WHERE email = ?', (email,))
            if cur.fetchone():
                conn.close()
                self.send_json({'success': False, 'message': 'Email sudah terdaftar. Silakan masuk (login).'}, 400)
                return

            salt = secrets.token_hex(16)
            pwd_hash = hash_pwd(password, salt)
            now = datetime.now().isoformat()
            cur.execute(
                'INSERT INTO users (name, email, password_hash, salt, created_at) VALUES (?, ?, ?, ?, ?)',
                (name, email, pwd_hash, salt, now)
            )
            user_id = cur.lastrowid

            token = secrets.token_hex(24)
            expires_at = (datetime.now() + timedelta(days=7)).isoformat()
            cur.execute(
                'INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)',
                (token, user_id, expires_at)
            )
            conn.commit()
            conn.close()

            self.send_json({
                'success': True,
                'message': 'Pendaftaran berhasil!',
                'token': token,
                'user': {'id': user_id, 'name': name, 'email': email}
            })
            return

        if path == '/api/auth/login':
            data = self.read_json_body()
            email = str(data.get('email', '')).strip().lower()
            password = str(data.get('password', ''))
            remember = bool(data.get('remember', False))

            if not email or not password:
                self.send_json({'success': False, 'message': 'Email dan password wajib diisi.'}, 400)
                return

            conn = sqlite3.connect(DB_FILE)
            cur = conn.cursor()
            cur.execute('SELECT id, name, password_hash, salt FROM users WHERE email = ?', (email,))
            row = cur.fetchone()

            if not row:
                salt = secrets.token_hex(16)
                pwd_hash = hash_pwd(password, salt)
                auto_name = email.split('@')[0].capitalize()
                now = datetime.now().isoformat()
                cur.execute(
                    'INSERT INTO users (name, email, password_hash, salt, created_at) VALUES (?, ?, ?, ?, ?)',
                    (auto_name, email, pwd_hash, salt, now)
                )
                user_id = cur.lastrowid
                name = auto_name
            else:
                user_id, name, pwd_hash, salt = row
                if hash_pwd(password, salt) != pwd_hash:
                    conn.close()
                    self.send_json({'success': False, 'message': 'Password salah. Silakan coba lagi atau gunakan Akun Demo.'}, 401)
                    return

            token = secrets.token_hex(24)
            days = 30 if remember else 2
            expires_at = (datetime.now() + timedelta(days=days)).isoformat()
            cur.execute(
                'INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)',
                (token, user_id, expires_at)
            )
            conn.commit()
            conn.close()

            self.send_json({
                'success': True,
                'message': 'Login berhasil!',
                'token': token,
                'user': {'id': user_id, 'name': name, 'email': email}
            })
            return

        if path == '/api/auth/logout':
            user = self.get_auth_user()
            if user:
                conn = sqlite3.connect(DB_FILE)
                cur = conn.cursor()
                cur.execute('DELETE FROM sessions WHERE token = ?', (user['token'],))
                conn.commit()
                conn.close()
            self.send_json({'success': True, 'message': 'Logout berhasil.'})
            return

        if path == '/api/orders':
            user = self.get_auth_user()
            if not user:
                self.send_json({'success': False, 'message': 'Harus login terlebih dahulu untuk membuat pesanan.'}, 401)
                return

            data = self.read_json_body()
            items = data.get('items', [])
            total_amount = float(data.get('total_amount', 0))
            payment_method = str(data.get('payment_method', 'QRIS'))

            if not items:
                self.send_json({'success': False, 'message': 'Keranjang belanja masih kosong.'}, 400)
                return

            order_id = 'ORD-' + secrets.token_hex(4).upper()
            now = datetime.now().isoformat()
            pickup_code = 'GET-' + secrets.token_hex(3).upper()

            conn = sqlite3.connect(DB_FILE)
            cur = conn.cursor()
            cur.execute('''INSERT INTO orders (id, user_id, customer_name, customer_email, items_json, total_amount, payment_method, status, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)''',
                (order_id, user['id'], user['name'], user['email'], json.dumps(items), total_amount, payment_method, 'PAID', now))
            conn.commit()
            conn.close()

            self.send_json({
                'success': True,
                'order_id': order_id,
                'pickup_code': pickup_code,
                'message': 'Pesanan berhasil dibuat!'
            })
            return

        self.send_json({'error': 'Endpoint not found'}, 404)

if __name__ == '__main__':
    init_db()
    print(f'Getsee Fullstack Server with SQLite Backend running at http://localhost:{PORT}/')
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(('', PORT), GetseeAPIHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print('Server stopped.')
