import { orders } from "../data/orders.js";
import { formatCurrency } from './utils/money.js'
import { cart } from "../data/cart-class.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'

async function loadPage() {
  await loadProductsFetch();
  
  let ordersHTML = ''
  
  orders.forEach((order) => {    
    const orderPlaced = dayjs(order.orderTime).format('MMMM DD')

    ordersHTML += `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${orderPlaced}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(order.totalCostCents)}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>

        <div class="order-details-grid">
          ${productsListHTML(order)}
        </div>
      </div>
  `
  })

  function productsListHTML(order) {
    let productListHTML = ''

    order.products.forEach(productDetails => {
      const product = getProduct(productDetails.productId)

      productListHTML += `
    <div class="product-image-container">
      <img src="${product.image}">
    </div>

    <div class="product-details">
      <div class="product-name">
        ${product.name}
      </div>
      <div class="product-delivery-date">
        Arriving on: ${dayjs(productDetails.estimatedDeliveryTime).format(`MMMM D`)}
      </div>
      <div class="product-quantity">
        Quantity: ${productDetails.quantity}
      </div>
      <button class="buy-again-button button-primary js-buy-again-button" data-product-id="${product.id}">
        <img class="buy-again-icon" src="images/icons/buy-again.png">
        <span class="buy-again-message">Buy it again</span>
      </button>
    </div>

    <div class="product-actions">
      <a>
        <button class="track-package-button button-secondary js-track-package-button" data-product-id="${product.id}" data-order-id="${order.id}">
          Track package
        </button>
      </a>
    </div>
    `

  })
  
  return productListHTML
}

function renderOrdersHeader() {
    let ordersHeaderHTML = ''
    
    ordersHeaderHTML += `
    <div class="amazon-header-left-section">
        <a href="amazon.html" class="header-link">
          <img class="amazon-logo"
            src="images/amazon-logo-white.png">
          <img class="amazon-mobile-logo"
            src="images/amazon-mobile-logo-white.png">
        </a>
      </div>

      <div class="amazon-header-middle-section">
        <input class="search-bar" type="text" placeholder="Search">

        <button class="search-button">
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
      .innerHTML = ordersHeaderHTML
  }

  document.querySelector(`.js-orders-grid`)
  .innerHTML = ordersHTML

  document.querySelectorAll(`.js-buy-again-button`).forEach(button => {
    button.addEventListener('click', () => {
      const { productId } = button.dataset
      cart.addToCart(productId, 1)
      renderOrdersHeader()
    })
  })

  document.querySelectorAll('.js-track-package-button').forEach(button => {
    button.addEventListener('click', () => {
      const { productId } = button.dataset
      const { orderId } = button.dataset

      window.location.href = `tracking.html?orderId=${orderId}&productId=${productId}`
    })
  })

  renderOrdersHeader()
}

loadPage()