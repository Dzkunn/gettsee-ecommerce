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
        provider: 'GETSEE_DEMO_API'
      });
    }, 700);
  });
}

function mockConfirmPayment(payment) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        ...payment,
        status: 'paid',
        paidAt: new Date().toISOString(),
        pickupCode: 'GET-' + Date.now().toString().slice(-6)
      });
    }, 900);
  });
}

function saveDemoOrder(order) {
  const key = 'getseeDemoOrders';
  let orders = [];
  try {
    orders = JSON.parse(localStorage.getItem(key)) || [];
  } catch (error) {
    orders = [];
  }
  orders.unshift(order);
  localStorage.setItem(key, JSON.stringify(orders.slice(0, 20)));
}

document.addEventListener('DOMContentLoaded', () => {
  if (!window.getseeShop.isLoggedIn()) {
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
    list.innerHTML = '<p class="cart-empty">Your cart is empty. Please choose a menu item first.</p>';
    payButton.disabled = true;
    return;
  }

  list.innerHTML = cart.map(item => `
    <article class="payment-line">
      <img src="${item.image || 'assets/logo.png'}" alt="">
      <div>
        <strong>${item.name}</strong>
        <small>${item.qty} x ${item.price || 'Custom order'}</small>
      </div>
      <b>${window.getseeShop.formatRupiah(item.value * item.qty)}</b>
    </article>
  `).join('');
  total.textContent = window.getseeShop.formatRupiah(window.getseeShop.cartTotal());

  payButton.addEventListener('click', async () => {
    const method = document.querySelector('input[name="paymentMethod"]:checked')?.value || 'QRIS';
    payButton.disabled = true;
    payButton.textContent = 'Creating payment...';
    status.textContent = 'Contacting GETSEE_DEMO_API...';

    const payment = await mockCreatePayment({ amount: window.getseeShop.cartTotal(), method });
    status.textContent = `${payment.provider}: ${payment.paymentId} created. Waiting for demo confirmation...`;
    payButton.textContent = 'Processing...';

    const paidPayment = await mockConfirmPayment(payment);
    saveDemoOrder({
      ...paidPayment,
      items: cart,
      createdAt: new Date().toISOString()
    });

    try {
      const token = localStorage.getItem('getseeAuthToken') || '';
      await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          items: cart,
          total_amount: window.getseeShop.cartTotal(),
          payment_method: method
        })
      });
    } catch (e) {
      console.log('Backend sync offline/fallback', e);
    }

    pickupCode.textContent = paidPayment.pickupCode;
    renderQr(paidPayment.pickupCode);
    result.hidden = false;
    status.textContent = method === 'CASH'
      ? 'Order created. Pay at the counter when picking up your order.'
      : 'Demo payment successful. Your order is ready to process.';
    payButton.textContent = 'Done';
    window.getseeShop.saveCart([]);
  });
});
