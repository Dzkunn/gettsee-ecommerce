'use strict';

function renderQr(code) {
  const qrBox = document.querySelector('#qrBox');
  if (!qrBox) return;
  const bits = Array.from({ length: 121 }, (_, index) => {
    const charCode = code.charCodeAt(index % code.length);
    return (charCode + index * 7) % 3 !== 0;
  });
  qrBox.innerHTML = bits.map(isDark => `<span class="${isDark ? 'dark' : ''}"></span>`).join('');
}

function mockCreatePayment({ amount, method }) {
  return new Promise(resolve => {
    setTimeout(() => {
      const paymentId = `PAY-${Date.now().toString().slice(-7)}`;
      resolve({
        paymentId,
        method,
        amount,
        status: method === 'CASH' ? 'waiting_pickup_payment' : 'pending',
        provider: 'GETSEE_PAYMENT_SYSTEM'
      });
    }, 500);
  });
}

function mockConfirmPayment(payment) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        ...payment,
        status: 'paid',
        paidAt: new Date().toISOString(),
        pickupCode: 'GET-' + Math.floor(100000 + Math.random() * 900000)
      });
    }, 600);
  });
}

function saveOrderHistory(order) {
  const session = window.getseeShop.getSession();
  const email = session?.email || 'guest@getsee.coffee';
  
  // 1. Shared order storage
  const key = 'getseeOrders';
  let orders = [];
  try {
    orders = JSON.parse(localStorage.getItem(key)) || [];
  } catch (error) {
    orders = [];
  }
  orders.unshift({ ...order, email });
  localStorage.setItem(key, JSON.stringify(orders.slice(0, 30)));

  // 2. Also keep getseeDemoOrders for backwards compatibility
  try {
    localStorage.setItem('getseeDemoOrders', JSON.stringify(orders.slice(0, 30)));
  } catch (e) {}
}

document.addEventListener('DOMContentLoaded', () => {
  if (!window.getseeShop.isLoggedIn() && !window.getseeShop.isGuest()) {
    localStorage.setItem('getseeCheckoutRedirect', 'payment.html');
    window.location.href = 'login.html?redirect=payment.html';
    return;
  }

  const cart = window.getseeShop.getCart();
  const list = document.querySelector('#paymentList');
  const total = document.querySelector('#paymentTotal');
  const payButton = document.querySelector('#payButton');
  const result = document.querySelector('#pickupResult');
  const pickupCode = document.querySelector('#pickupCode');
  const status = document.querySelector('#paymentStatus');

  if (!cart.length) {
    list.innerHTML = '<p class="cart-empty">Keranjang Anda masih kosong. Silakan pilih menu kopi atau donat terlebih dahulu.</p>';
    payButton.disabled = true;
    return;
  }

  list.innerHTML = cart.map(item => {
    const customBadge = [item.temp, item.sugar, item.notes ? `Catatan: ${item.notes}` : ''].filter(Boolean).join(' • ');
    return `
    <article class="payment-line" style="display: grid; grid-template-columns: 60px 1fr auto; gap: 14px; align-items: center; border: 1px solid rgba(4,73,157,.12); border-radius: 14px; padding: 12px; background: #f7faff; margin-bottom: 10px;">
      <img src="${item.image || 'assets/logo.png'}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 10px; background: #fff;">
      <div>
        <strong style="display: block; font-size: 14px; color: #071831;">${item.name}</strong>
        ${customBadge ? `<span style="display: block; font-size: 11px; color: #607089; font-weight: 600; line-height: 1.3; margin: 2px 0;">${customBadge}</span>` : ''}
        <small style="color: #607089; font-weight: 700;">${item.qty} x ${item.price || 'Custom order'}</small>
      </div>
      <b style="color: #04499D; font-size: 14px;">${window.getseeShop.formatRupiah(item.value * item.qty)}</b>
    </article>`;
  }).join('');
  total.textContent = window.getseeShop.formatRupiah(window.getseeShop.cartTotal());

  payButton.addEventListener('click', async () => {
    const method = document.querySelector('input[name="paymentMethod"]:checked')?.value || 'QRIS';
    payButton.disabled = true;
    payButton.textContent = 'Memproses Pesanan...';
    status.textContent = 'Menghubungkan ke sistem kasir Getsee...';

    const payment = await mockCreatePayment({ amount: window.getseeShop.cartTotal(), method });
    status.textContent = `Memvalidasi metode pembayaran (${payment.method})...`;
    payButton.textContent = 'Menyiapkan Kode Pickup...';

    const paidPayment = await mockConfirmPayment(payment);
    const orderData = {
      ...paidPayment,
      items: cart,
      createdAt: new Date().toISOString()
    };
    saveOrderHistory(orderData);

    // Kirim pesanan ke Railway Backend jika online
    try {
      const baseUrl = (window.GETSEE_CONFIG && window.GETSEE_CONFIG.API_BASE_URL) || '';
      const session = window.getseeShop.getSession();
      await fetch(`${baseUrl}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart,
          total_amount: window.getseeShop.cartTotal(),
          payment_method: method,
          email: session?.email || 'guest'
        })
      });
    } catch (e) {
      // Offline fallback: order sudah tersimpan di localStorage
    }

    pickupCode.textContent = paidPayment.pickupCode;
    renderQr(paidPayment.pickupCode);
    result.hidden = false;
    status.innerHTML = method === 'CASH'
      ? '<strong style="color: #12b76a;">✓ Pesanan Berhasil Dicatat!</strong> Silakan bayar di kasir saat mengambil pesanan Anda.'
      : '<strong style="color: #12b76a;">✓ Pembayaran Berhasil Terkonfirmasi!</strong> Pesanan Anda segera disiapkan.';
    payButton.textContent = 'Pesanan Selesai';
    payButton.style.background = '#12b76a';
    window.getseeShop.saveCart([]);
  });
});
