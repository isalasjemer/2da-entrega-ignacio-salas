import { promises as fs } from 'fs';
import path from 'path';
import { IProduct } from '../types/product';

export class Product {
  static filename = 'products.json';
  static path = path.join(__dirname, this.filename);

  static async getFileData(): Promise<IProduct[]> {
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

  static async create(product: Partial<IProduct>): Promise<IProduct | undefined> {
    try {
      let data = await this.getFileData();

      // @ts-ignore
      const id = data.length > 0 ? data?.at(-1)?.id + 1 : 1;

      const prod = {
        ...product,
        id,
        timestamp: Date.now(),
      } as IProduct;

      data.push(prod);

      await fs.writeFile(this.path, JSON.stringify(data, null, 2));

      return prod;
    } catch (err) {
      console.log(err);
    }
  }

  static async update(id: number, product: Partial<IProduct>): Promise<IProduct[] | undefined> {
    try {
      let data = await this.getFileData();

      const newProducts = data.map((item, index) => {
        if (item.id === id) {
          console.log(item);

          return {
            ...item,
            ...product,
            timestamp: Date.now(),
          };
        }

        return item;
      });

      await fs.writeFile(this.path, JSON.stringify(newProducts, null, 2));

      return newProducts;
    } catch (err) {
      console.log(err);
    }
  }

  static async getById(id: number): Promise<IProduct | undefined> {
    try {
      const data = await this.getFileData();

      console.log(id);

      console.log(data);

      const match = data.filter((item, index) => item.id === id);

      return match[0];
    } catch (err) {
      console.log(err);
    }
  }

  static async getAll(): Promise<IProduct[] | undefined> {
    try {
      const data = await this.getFileData();

      return data;
    } catch (err) {
      console.log(err);
    }
  }

  static async deleteById(id: number): Promise<void> {
    try {
      const data = await this.getFileData();

      const newData = data.filter((item, index) => item.id !== id);

      await fs.writeFile(this.path, JSON.stringify(newData, null, 2));
    } catch (err) {
      console.log(err);
    }
  }

  static async deleteAll(): Promise<void> {
    try {
      await fs.writeFile(this.path, '[]');
    } catch (err) {
      console.log(err);
    }
  }
}
