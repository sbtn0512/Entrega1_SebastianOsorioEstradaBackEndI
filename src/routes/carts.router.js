import { Router } from "express";
import CartManager from "../dao/cart.manager.js";
import ProductManager from "../dao/product.manager.js";

const router = Router();
const cartManager = new CartManager();
const productManager = new ProductManager();

router.post("/", async (req, res) => {
    const carts = await cartManager.createCart();
    res.json(carts);
});

router.get("/", async (req, res) => {
    const cart = await cartManager.getCarts();
    res.status(201).json(cart);
});

router.get("/:cid", async (req, res) => {
    const cart = await cartManager.getCartById(req.params.cid);
    if (!cart) {
        return res.status(404).json({ message: "Carrito no encontrado" });
    }
    res.json(cart.products);
});

router.post("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    const cart = await cartManager.getCartById(cid);
    if (!cart) {
        return res.status(404).json({message: "Carrito no encontrado"});
    }
    const product = await productManager.getProductById(pid);
    if (!product) {
        return res.status(404).json({message: "Producto no encontrado"});
    }
    const updatedCart = await cartManager.addProductToCart(cid, pid);
    res.json(updatedCart);
});

export default router;