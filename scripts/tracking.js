import { getProduct, loadProductsFetch } from "../data/products.js"
import { orders } from "../data/orders.js"
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
console.log(orders)

function getOrder(orderId) {
  let matchingOrder;

  orders.forEach(order => {
    if (orderId === order.id) {
      matchingOrder = order
    }
  })

  return matchingOrder;
}

function getOrderInfo(order, productId) {
  let orderInfo = {}
  let matchingProduct;
  order.products.forEach(product => {
    console.log(product)
    
    if (product.productId === productId) {
      matchingProduct = product
    }
  })
  orderInfo = {
    estimatedDeliveryTime: matchingProduct.estimatedDeliveryTime,
    quantity: matchingProduct.quantity
  }

  return orderInfo
}

async function loadPage() {
  await loadProductsFetch()

  const url = new URL(window.location.href)
  
  const orderId = url.searchParams.get(`orderId`)
  const productId = url.searchParams.get(`productId`)

  const order = getOrder(orderId)
  const product = getProduct(productId)
  const orderInfo = getOrderInfo(order, productId)

  let html = ''

  html += `
      <div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${dayjs(orderInfo.estimatedDeliveryTime).format('dddd, MMMM DD')}
        </div>

        <div class="product-info">
          ${product.name}
        </div>

        <div class="product-info">
          Quantity: ${orderInfo.quantity}
        </div>

        <img class="product-image" src="${product.image}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
      </div>
  `

  document.querySelector(`.main`)
    .innerHTML = html
} 

loadPage()