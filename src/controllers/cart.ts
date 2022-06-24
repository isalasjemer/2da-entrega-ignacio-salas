import { RequestHandler } from 'express';
import { Cart } from '../models/Cart';
import { Product } from '../models/Product';

export const createCart: RequestHandler = async (req, res) => {
  try {
    const cartId = await Cart.createCart();

    return res.status(200).json({ cartId });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};

export const deleteCart: RequestHandler = async (req, res) => {
  try {
    await Cart.deleteById(parseInt(req.params.id));

    return res.status(200).json({
      message: `Cart with ID: ${req.params.id} deleted`,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};

export const getCartProducts: RequestHandler = async (req, res) => {
  try {
    const cart = await Cart.getById(parseInt(req.params.id));

    return res.status(200).json({ products: cart?.products });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};

export const addProductToCart: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { productId } = req.body;

  try {
    const product = await Product.getById(productId);

    if (!product) return res.status(404).json({ error: 'Product not found' });

    const cart = await Cart.addProductToCart(parseInt(id), product!);

    return res.status(200).json(cart);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};

export const removeProductFromCart: RequestHandler = async (req, res) => {
  const { id, productId } = req.params;

  try {
    await Cart.deleteProductFromCart(parseInt(id), parseInt(productId));

    return res.status(200).json({
      message: `Product with ID: ${productId} removed from cart with ID: ${id}`,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};
