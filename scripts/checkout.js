import { renderOrderSummary } from './checkout/orderSummary.js'
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
import { loadProducts, loadProductsFetch } from '../data/products.js';
import { cart } from '../data/cart-class.js';
// import '../data/car.js'
// import '../data/cart-class.js'
// import '../data/backend-practice.js'

async function loadPage() { // async makes a function returns a promise // can only use await when in a async function
  try {
    // throw 'error1' // thats for create an error
    await Promise.all([
      loadProductsFetch(), 
      cart.loadCartFetch()
    ])

  } catch (error) {
    console.log('Unexpected error. Please try again later.')
  }

  renderCheckoutHeader()
  renderOrderSummary()
  renderPaymentSummary()
}
loadPage()

/*
Promise.all([ // array of promises that wait all the promises to finish to continue the code
  loadProductsFetch(),
  new Promise((resolve) => {
    cart.loadCart(() => {
      resolve();
    })
  })
]).then((values) => {
  console.log(values)
  renderCheckoutHeader()
  renderOrderSummary()
  renderPaymentSummary()
})
*/

/*
new Promise((resolve) => { // it runs the inner function immediately
  loadProducts(() => {
    resolve('value1');
  });
}).then((value) => {
  console.log(value)
  return new Promise((resolve) => {
    loadCart(() => {
      resolve();
    })
  })
}).then(() => {
  renderCheckoutHeader()
  renderOrderSummary()
  renderPaymentSummary()
})
*/

// Promises keep our code flat

/*
loadProducts(() => { // anonymous function
  loadCart(() => {
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();
  }) 
})
*/