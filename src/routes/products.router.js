import { Router } from "express";
import ProductManager from "../dao/product.manager.js";

const router = Router();

const productManager =
    new ProductManager();

router.get("/", async (req, res) => {
    const products = await productManager.getProducts();
    res.json(products);
});

router.get("/:pid", async (req, res) => {
    const product = await productManager.getProductById(req.params.pid);
    if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(product);
});

router.post("/", async (req, res) => {
    const product = await productManager.addProduct(req.body);
    res.status(201).json(product);
});

router.put("/:pid", async (req, res) => {
    const updatedProduct = await productManager.updateProduct(req.params.pid, req.body);
    if (!updatedProduct) {
        return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json({message: "Producto actualizado",
        product: updatedProduct});
});

router.delete("/:pid", async (req, res) => {
    const { pid } = req.params;
    const deleted = await productManager.deleteProduct(pid);
    if (!deleted) {
        return res.status(404).json({message: "Producto no encontrado"});
    }
    res.json({message: "Producto eliminado correctamente"});
});

export default router;