import { getProduct, loadProductsFetch } from "../data/products.js"
import { orders } from "../data/orders.js"
import { cart } from "../data/cart-class.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import { redirectToHomePage } from "./utils/searchBar.js";

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

function calculateProgressPercent(order, orderInfo) {
  let progressPercent;

  progressPercent = (dayjs() - dayjs(order.orderTime)) / (dayjs(orderInfo.estimatedDeliveryTime) - dayjs(dayjs(order.orderTime))) * 100

  return progressPercent
}

function renderTrackingHeader() {
  let trackingHeader = ''

  trackingHeader += `
    <div class="amazon-header-left-section">
      <a href="amazon.html" class="header-link">
        <img class="amazon-logo"
          src="images/amazon-logo-white.png">
        <img class="amazon-mobile-logo"
          src="images/amazon-mobile-logo-white.png">
      </a>
    </div>

    <div class="amazon-header-middle-section">
      <input class="search-bar js-search-bar" type="text" placeholder="Search">

      <button class="search-button js-search-button">
        <img class="search-icon" src="images/icons/search-icon.png">
      </button>
    </div>

    <div class="amazon-header-right-section">
      <a class="orders-link header-link" href="orders.html">
        <span class="returns-text">Returns</span>
        <span class="orders-text">& Orders</span>
      </a>

      <a class="cart-link header-link" href="checkout.html">
        <img class="cart-icon" src="images/icons/cart-icon.png">
        <div class="cart-quantity">${cart.calculateCartQuantity()}</div>
        <div class="cart-text">Cart</div>
      </a>
    </div>
  `

  document.querySelector(`.js-amazon-header`)
    .innerHTML = trackingHeader
}

async function loadPage() {
  await loadProductsFetch()
  
  const url = new URL(window.location.href)
  
  const orderId = url.searchParams.get(`orderId`)
  const productId = url.searchParams.get(`productId`)

  const order = getOrder(orderId)
  const product = getProduct(productId)
  const orderInfo = getOrderInfo(order, productId)
  const progressPercent = calculateProgressPercent(order, orderInfo)

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
          <div class="progress-label ${progressPercent < 50? 'current-status' : ''}">
            Preparing
          </div>
          <div class="progress-label ${progressPercent >= 50 && progressPercent < 100? 'current-status' : ''}">
            Shipped
          </div>
          <div class="progress-label ${progressPercent === 100? 'current-status' : ''}">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar js-progress-bar"></div>
        </div>
      </div>
  `

  document.querySelector(`.main`)
    .innerHTML = html

  document.querySelector(`.js-progress-bar`)
    .setAttribute('style', `width: ${progressPercent}%`)

  renderTrackingHeader()
  redirectToHomePage()
} 

loadPage()