import { IProduct } from './product';

export interface ICart {
  id: number;
  timestamp: number;
  products: IProduct[];
}
