const socket = io();
console.log("Realtime.js cargado");
socket.on("connect", () => {
    console.log("Conectado al servidor:", socket.id);
});

socket.on("connect_error", (error) => {
    console.error("Error de conexión:", error);
});

const form = document.getElementById("productForm");

form.addEventListener("submit", e => {
    e.preventDefault();
    const formData = new FormData(form);
    socket.emit("newProduct", {
        title: formData.get("title"),
        description: "",
        code: crypto.randomUUID(),
        price: Number(formData.get("price")),
        status: true,
        stock: 10,
        category: "General",
        thumbnails: []
    });
    form.reset();
});

function deleteProduct(id) {
    socket.emit("deleteProduct", id);
}
socket.on("updateProducts", products => {
    const list = document.getElementById("productsList");
    list.innerHTML = "";
    products.forEach(product => {
        list.innerHTML += `
        <li>
            ${product.title}
            - $${product.price}
            <button onclick="deleteProduct('${product.id}')">
            Eliminar
            </button>
        </li>
        `;
    });
});