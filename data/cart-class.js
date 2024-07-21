import { validDeliveryOption } from "./deliveryOptions.js";

class Cart {              // class help us generate those objects
  cartItems;                     // class === object generator
  #localStorageKey;              // === localStorageKey = undefined;
// # === private property === it can't be used outside of the class
  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey; // 'this' points to the object that we generate
    this.loadFromStorage();
  }

  loadFromStorage() {   // shortcut for: loadFromStorage: function() {...}
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
  
    if (!this.cartItems) {
      this.cartItems = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
      }];
    }
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems))
  }

  addToCart(productId, quantity = 1) {
    let matchingItem;
        
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem
      }
    });
  
    if (matchingItem) {
      matchingItem.quantity += quantity
    } else {
      this.cartItems.push({
        productId,
        quantity,
        deliveryOptionId: '1'
      });
    }
  
    this.saveToStorage();
  }

  removeFromCart(productId) {
    const newCart = [];
  
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem) // push all the elements that are not the productId, the same that we want to remove from the cart.
      }
    }) 
  
    this.cartItems = newCart;
  
    this.saveToStorage();
  }

  calculateCartQuantity() {
    let cartQuantity = 0;
        
    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    })
    return cartQuantity
  }

  updateQuantity(productId, newQuantity) {
    let matchingProduct;
  
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingProduct = cartItem
      }
  
      if (matchingProduct) {
        matchingProduct.quantity = newQuantity
      }
    })
    
    this.saveToStorage()
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
        
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem
      }
    });
  
    if(!matchingItem) {
      return;
    }
  
    if (!validDeliveryOption(deliveryOptionId)) {
      return;
    }
  
    matchingItem.deliveryOptionId = deliveryOptionId
  
    this.saveToStorage()
  }
}

export const cart = new Cart('cart-oop'); // this cart is a instance of a class
const businessCart = new Cart('cart-business'); // the parameters here are going to the constructor

console.log(cart)
console.log(businessCart)
console.log(cart instanceof Cart)
console.log(businessCart instanceof Cart)