# Entrega 1 - Backend I

## Descripción

API REST desarrollada con Node.js y Express para la gestión de productos y carritos de compra.

La aplicación permite:

* Crear, consultar, actualizar y eliminar productos.
* Crear carritos de compra.
* Consultar los productos de un carrito.
* Agregar productos a un carrito.
* Persistir la información mediante archivos JSON.

---

## Tecnologías Utilizadas

* Node.js
* Express
* UUID
* File System (fs)

---

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/sbtn0512/Entrega1_SebastianOsorioEstradaBackEndI
```

Ingresar al directorio del proyecto:

```bash
cd Entrega1_SebastianOsorioEstrada_BackendI
```

Instalar dependencias:

```bash
npm install
```

---

## Ejecución

Modo desarrollo:

```bash
npm run dev
```

El servidor se ejecutará en:

```text
http://localhost:8080
```

---

## Estructura del Proyecto

```text
src/
│
├── dao/
│   ├── ProductManager.js
│   └── CartManager.js
│
├── data/
│   ├── products.json
│   └── carts.json
│
├── routes/
│   ├── products.router.js
│   └── carts.router.js
│
├── app.js
└── index.js
```

---

## Endpoints

### Productos

#### Obtener todos los productos

```http
GET /api/products
```

#### Obtener un producto por ID

```http
GET /api/products/:pid
```

#### Crear un producto

```http
POST /api/products
```

Body:

```json
{
  "title": "Kia K3 GT",
  "description": "Sedán deportivo",
  "code": "K3GT001",
  "price": 98000000,
  "status": true,
  "stock": 5,
  "category": "Vehículos",
  "thumbnails": []
}
```

#### Actualizar un producto

```http
PUT /api/products/:pid
```

Body:

```json
{
  "price": 100000000,
  "stock": 10
}
```

#### Eliminar un producto

```http
DELETE /api/products/:pid
```

---

### Carritos

#### Crear un carrito

```http
POST /api/carts
```

#### Obtener los productos de un carrito

```http
GET /api/carts/:cid
```

#### Agregar un producto al carrito

```http
POST /api/carts/:cid/product/:pid
```

Si el producto ya existe dentro del carrito, se incrementa automáticamente la propiedad `quantity`.

---

## Persistencia

La información se almacena en archivos JSON ubicados en:

```text
src/data/products.json
src/data/carts.json
```

---

## Autor

Sebastián Osorio Estrada

Proyecto desarrollado para el curso Backend I de Coderhouse.
