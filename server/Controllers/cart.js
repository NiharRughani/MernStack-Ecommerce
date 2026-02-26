import { Cart } from "../Models/Cart.js";

// add items to the cart

export const addToCart = async (req, res) => {
  const { productId, title, price, qty, imgSrc } = req.body;

  const userId = req.user;

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({
      userId,
      items: [],
    });
  }

  const itemIndex = cart.items.findIndex((item) => {
    return item.productId.toString() === productId;
  });

  if (itemIndex > -1) {
    cart.items[itemIndex].qty += qty;
    cart.items[itemIndex].price += price * qty;
  } else {
    cart.items.push({ productId, title, price, qty, imgSrc });
  }

  await cart.save();

  res.json({ message: "items added to cart", cart });
};

// find cart for the user

export const userCart = async (req, res) => {
  const userId = req.user;

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    return res.json({
      message: "cart not found",
    });
  }

  res.json({
    cart,
  });
};

// remove item from the cart

export const removeItemFromCart = async (req, res) => {
  const productId = req.params.productId;
  const userId = req.user;

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    return res.json({
      message: "cart not found",
    });
  }
  cart.items = cart.items.filter((item) => {
    return item.productId.toString() !== productId;
  });

  await cart.save();

  res.json({ message: "product remove from cart", cart });
};

//remove single quantity from cart

export const decreaseQtyFromCart = async (req, res) => {
  const { productId, qty } = req.body;

  const userId = req.user;

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({
      userId,
      items: [],
    });
    return res.json("cart is created no item to decrease", cart);
  }

  const itemIndex = cart.items.findIndex((item) => {
    return item.productId.toString() === productId;
  });

  if (itemIndex > -1) {
    const item = cart.items[itemIndex];

    if (item.qty > qty) {
      const pricePerUnit = item.price / item.qty;
      item.qty -= qty;
      item.price -= pricePerUnit * qty;
    } else {
      cart.items.splice(itemIndex, 1);
      //remove whole single element
    }
  } else {
    return res.json({ message: "invalid product id" });
  }

  await cart.save();

  res.json({ message: "item quantity reduced", cart });
};

// clear cart

export const clearCart = async (req, res) => {
  const userId = req.user;

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({
      userId,
      items: [],
    });
  } else {
    cart.items = [];
  }

  await cart.save();
  res.json({
    message: "cart is cleared",
  });
};
