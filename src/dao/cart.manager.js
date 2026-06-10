import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class CartManager {

    constructor() {
        this.path = path.join(
            __dirname,
            "../data/carts.json"
        );
    }

    async getCarts() {
        try {
            const data = await fs.readFile(this.path, "utf-8");
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async createCart() {
        const carts = await this.getCarts();
        const newCart = { id: uuidv4(), products: [] };
        carts.push(newCart);
        await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
        return newCart;
    }

    async getCartById(id) {
        const carts = await this.getCarts();
        return carts.find(cart => cart.id === id);
    }

    async addProductToCart(cartId, productId) {
        const carts = await this.getCarts();
        const cart = carts.find(cart => cart.id === cartId);
        if (!cart) {
            return null;
        }
        const existingProduct = cart.products.find(item => item.product === productId);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.products.push({ product: productId, quantity: 1 });
        }
        await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
        return cart;
    }
}