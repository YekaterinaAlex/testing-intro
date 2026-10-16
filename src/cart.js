function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

function addToCart(cart, product, quantity) {
  if (quantity <= 0) {
    throw new RangeError('Количество должно быть больше 0');
  }

  const existingProduct = cart.find((item) => item.id === product.id);

  const existingQuantity = existingProduct ? existingProduct.quantity : 0;
  if (existingQuantity + quantity > product.stock) {
    throw new RangeError('Недостаточно товара на складе');
  }

  if (existingProduct) {
    return cart.map((item) => {
      if (item.id === product.id) {
        return {
          ...item,
          quantity: item.quantity + quantity,
        };
      }

      return item;
    });
  }
  return [...cart, { ...product, quantity: quantity }];
}

function changeQuantity(cart, productId, quantity) {
  if (quantity <= 0) {
    throw new RangeError('Количество должно быть больше 0');
  }

  return cart.map((item) => {
    if (item.id === productId) {
      if (quantity > item.stock) {
        throw new RangeError('Недостаточно товара на складе');
      }
      return {
        ...item,
        quantity: quantity,
      };
    }

    return item;
  });
}

function removeFromCart(cart, productId) {
  return cart.filter((item) => item.id !== productId);
}

function calculateCartSubtotal(cart) {
  return cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
}

function calculateOrderTotal(cart, promo) {
  const subtotal = calculateCartSubtotal(cart);

  let discount = 0;

  if (promo === 'SAVE10' && subtotal >= 20000) {
    discount = subtotal * 0.1;
  }
  const delivery = subtotal < 50000 ? 30000 : 0;
  const total = subtotal - discount + delivery;
  return {
    subtotal,
    discount,
    delivery,
    total,
  };
}

const cartApi = {
  addToCart,
  changeQuantity,
  removeFromCart,
  calculateCartSubtotal,
  calculateOrderTotal,
};

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
