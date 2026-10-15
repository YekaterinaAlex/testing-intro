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
function changeQuantity() {
  return notImplemented();
}
function removeFromCart() {
  return notImplemented();
}
function calculateCartSubtotal() {
  return notImplemented();
}
function calculateOrderTotal() {
  return notImplemented();
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
