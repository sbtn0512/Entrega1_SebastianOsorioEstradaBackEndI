import app from "./src/app.js";
import { Server } from "socket.io";
import ProductManager from "./src/dao/product.manager.js";

const PORT = 8080;

const httpServer = app.listen(PORT, () => {
    console.log(
        `Servidor ejecutándose en puerto ${PORT}`
    );
})

const io = new Server(httpServer);
const manager = new ProductManager("./src/data/products.json");

io.on("connection", socket => {
    console.log("Cliente conectado");
    socket.on("newProduct", async product => {
        console.log("Producto recibido:", product);
        await manager.addProduct(product);
        const products = await manager.getProducts();
        io.emit("updateProducts", products);
    });
    socket.on("deleteProduct", async (id) => {
        await manager.deleteProduct(id);
        const products = await manager.getProducts();
        io.emit("updateProducts", products);
    });
});