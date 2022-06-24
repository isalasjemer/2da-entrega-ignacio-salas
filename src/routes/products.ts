import { Router } from 'express';
import { addProduct, deleteProduct, getProducts, updateProduct } from '../controllers/product';
import { roleCheck } from '../middlewares/roleCheck';

const productsRoutes = Router();

productsRoutes.get('/:id?', getProducts);
productsRoutes.post('/', roleCheck, addProduct);
productsRoutes.put('/:id', roleCheck, updateProduct);
productsRoutes.delete('/:id', roleCheck, deleteProduct);

export { productsRoutes };
