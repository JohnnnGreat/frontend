export const dummyOrderData = {
  _id: "1234567890abcdef",
  user: {
    name: "John Doe",
    email: "john@example.com",
  },
  orderItems: [
    {
      name: "Product 1",
      qty: 2,
      image: "https://via.placeholder.com/150",
      price: 50.0,
      product: "1",
    },
    {
      name: "Product 2",
      qty: 1,
      image: "https://via.placeholder.com/150",
      price: 100.0,
      product: "2",
    },
  ],
  shippingAddress: {
    address: "123 Main St",
    city: "Anytown",
    postalCode: "12345",
    country: "USA",
  },
  paymentMethod: "PayPal",
  taxPrice: 10.0,
  shippingPrice: 15.0,
  totalPrice: 225.0,
  isPaid: true,
  paidAt: "2024-08-14T12:34:56Z",
  isDelivered: false,
  deliveredAt: null,
};
