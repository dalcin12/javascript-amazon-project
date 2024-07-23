export const orders = JSON.parse(localStorage.getItem('orders')) || []
/*[
  {
    id: "869e3b50-3f18-40f7-a383-e3e708a7df3e",
    orderTime: '2024-07-24T00:07:37.675Z',
    products: [{
      estimatedDeliveryTime: "2024-07-30T00:07:37.675Z",
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2
    }, {
      estimatedDeliveryTime: `2024-07-30T00:07:37.675Z`,
      productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
      quantity: 1
    }],
    totalCostCents: 3277
  }
];
*/

export function addOrder(order) {
  orders.unshift(order); // .unshift method adds an order to the front
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders))
}