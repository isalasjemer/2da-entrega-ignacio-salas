import { promises as fs } from 'fs';
import path from 'path';
import { ICart } from '../types/cart';
import { IProduct } from '../types/product';

export class Cart {
  static filename = 'carts.json';
  static path = path.join(__dirname, this.filename);

  static async getFileData(): Promise<ICart[]> {
    let file: string = '[]';
    try {
      // Leo si el archivo existe
      file = await fs.readFile(this.path, 'utf-8');
      // Si existe, lo devuelvo
      return JSON.parse(file);
    } catch (error: any) {
      // Si hay algun error, verifico que sea porque el archivo no existe y creo uno con un array vacio
      if (error.code == 'ENOENT') {
        await fs.writeFile(this.path, '[]');
        // Luego de crearlo, leo su valor para que la funcion devuelva un valor al ser llamada
        file = await fs.readFile(this.path, 'utf-8');
      } else {
        // Si el error es por otra cosa, lo muestro por consola
        console.log(error);
      }
    }

    return JSON.parse(file);
  }

  static async createCart(): Promise<number | void> {
    try {
      let data = await this.getFileData();

      // @ts-ignore
      const id = data.length > 0 ? data?.at(-1)?.id + 1 : 1;

      data.push({
        id,
        timestamp: Date.now(),
        products: [],
      });

      await fs.writeFile(this.path, JSON.stringify(data, null, 2));

      return id;
    } catch (err) {
      console.log(err);
    }
  }

  static async addProductToCart(cartId: number, product: IProduct) {
    try {
      let data = await this.getFileData();

      const newData = data.map((item, index) => {
        if (item.id === cartId) {
          item.products.push(product);
          return item;
        }

        return item;
      });

      const cart = newData.filter((item, index) => item.id === cartId);

      await fs.writeFile(this.path, JSON.stringify(newData, null, 2));

      return cart;
    } catch (err) {
      console.log(err);
    }
  }

  static async deleteProductFromCart(cartId: number, productId: number) {
    try {
      let data = await this.getFileData();

      const carts = data.map((item, index) => {
        if (item.id === cartId) {
          item.products = item.products.filter((product, index) => product.id !== productId);
          return item;
        }

        return item;
      });

      // const cartProducts = cart[0]?.products?.filter((item, index) => item.id !== productId);

      // cart[0].products = cartProducts;

      await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
    } catch (err) {
      console.log(err);
    }
  }

  static async getById(id: number): Promise<ICart | undefined> {
    try {
      const data = await this.getFileData();

      const match = data.filter((item, index) => item.id === id);

      return match[0];
    } catch (err) {
      console.log(err);
    }
  }

  static async getAll() {
    try {
      const data = await this.getFileData();

      return data;
    } catch (err) {
      console.log(err);
    }
  }

  static async deleteById(id: number) {
    try {
      const data = await this.getFileData();

      const newData = data.filter((item, index) => item.id !== id);

      // console.log(newData);

      await fs.writeFile(this.path, JSON.stringify(newData, null, 2));
    } catch (err) {
      console.log(err);
    }
  }

  static async deleteAll() {
    try {
      await fs.writeFile(this.path, '[]');
    } catch (err) {
      console.log(err);
    }
  }
}
