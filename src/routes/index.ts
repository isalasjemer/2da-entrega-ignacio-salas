import { Router } from 'express';
import { productsRoutes } from './products';
import { cartRoutes } from './cart';

const router = Router();

router.use('/products', productsRoutes);
router.use('/cart', cartRoutes);

export { router };
