import { type DB } from '@/types/db';
import { wait } from '@/utils/wait';
import fs from 'fs/promises';

export type DeleteProductDataArgs = {
  id: string;
};

export async function deleteProductData({ id }: DeleteProductDataArgs) {
  await wait(1000);
  const db = JSON.parse(await fs.readFile('db.json', 'utf-8')) as DB;

  const index = db.products.findIndex(product => product.id === id);

  if (index === -1) {
    throw new Error(`Product with id "${id}" not found`);
  }

  const newProducts = db.products.filter(product => product.id !== id);
  db.products = newProducts;

  await fs.writeFile('db.json', JSON.stringify(db, null, 2));
}
