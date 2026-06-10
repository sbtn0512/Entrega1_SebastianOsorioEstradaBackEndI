import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class ProductManager {
    constructor() {
        this.path = path.join(
            __dirname,
            "../data/products.json"
        );
    }

    async getProducts() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch {
            return [];
        }
    }

    async getProductById(id) {
        const products = await this.getProducts();
        return products.find(p => p.id === id)
    }

    async addProduct(productData) {
        const products = await this.getProducts();
        const newProduct = {
            id: uuidv4(),
            ...productData
        };
        products.push(newProduct);
        await fs.writeFile(this.path, JSON.stringify(products, null, 2));
        return newProduct;
    }

    async updateProduct(id, updateFields) {
        const products = await this.getProducts();
        const index = products.findIndex(product => product.id === id);
        if (index === -1) {
            return null;
        }
        products[index] = {
            ...products[index],
            ...updateFields
        };
        await fs.writeFile(this.path, JSON.stringify(products, null, 2));
        return products[index];
    }

    async deleteProduct(id) {
    const products = await this.getProducts();
    const index = products.findIndex(product => product.id === id);
    if (index === -1) {
        return false;
    }
    products.splice(index, 1);
    await fs.writeFile(this.path, JSON.stringify(products, null, 2));
    return true;
    }
}