const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const mysql = require("./database/mysql-pool");

// Configuración para subir límite de respuesta
app.use(express.json({ limit: "25mb" }));
// Para evitar errores de diferente origen cuando se hace la petición
app.use(cors());

// Configuración para escuchar en el puerto definido
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

// Endpoints
app.get("/products", async (req, res) => {
    try {
        const query = "SELECT * FROM products";

        const connection = await mysql.getConnection();
        const data = await connection.query(query);
        res.json(data[0]);
    } catch {
        res.send("Algo ha ido mal");
    }
});

// app.get("/product", async (req, res) => {
//     try {
//         const id = 2;
//         const query = "SELECT * FROM products WHERE id_product = ?";

//         const connection = await mysql.getConnection();
//         // ("SELECT * FROM products WHERE id_product = ?", [1])
//         const data = await connection.query(query, [id]);
//         res.json(data[0]);
//     } catch {
//         res.send("Algo ha ido mal");
//     }
// });

// este endpoint es el ejemplo de use params para filtrar lo que nos devuelve el servidor

app.get("/search-products", async (req, res) => {
    try {
        const { search, order } = req.query;
        console.log(search);

        const query = `SELECT * FROM products WHERE name LIKE ? ORDER BY name ${order}`;

        const connection = await mysql.getConnection();
        // %anillo%;
        const data = await connection.query(query, [`%${search}%`]);
        res.json(data[0]);
    } catch {
        res.send("Algo ha ido mal");
    }
});

//este endpoint es el ejemplo para que el servidor nos devuelva un registro/producto en específico (por id)

app.get("/search-categories/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const query = "SELECT * FROM categories WHERE id_category=?";
        const connection = await mysql.getConnection();
        // %anillo%;
        const data = await connection.query(query, [id]);
        res.json(data[0]);
    } catch {
        res.send("Algo ha ido mal");
    }
});

//crear nuevos registos en la BD (usuarios, productos... PRIMERO AQUÍ EL ENDPOINT y luego EN POSTMAN LOS DATOS de usuario, producto...)

app.post("/users", async (req, res) => {
    try {
        const { name, email } = req.body;

        const query = "INSERT INTO users (name, email) VALUES (?, ?)";

        const connection = await mysql.getConnection();
        await connection.query(query, [name, email]);

        res.status(201).json({
            message: "Usuario creado",
        });
    } catch {
        res.send("Algo ha ido mal");
    }
});

//Este endpoint sirve para crear nuevos productos a través de POSTMAN

app.post("/add-products", async (req, res) => {
    try {
        const { name, price, description, fk_category } = req.body;

        const query =
            "INSERT INTO products (name, price, description, fk_category) VALUES (?, ?, ?, ?)";

        const connection = await mysql.getConnection();
        await connection.query(query, [name, price, description, fk_category]);

        res.status(201).json({
            message: "Producto creado",
        });
    } catch {
        res.send("Algo ha ido mal");
    }
});

//Este endpoint sirve para crar nuevas categorías a través de POSTMAN

app.post("/add-categories", async (req, res) => {
    try {
        const { name } = req.body;

        const query = "INSERT INTO categories (name) VALUES (?)";

        const connection = await mysql.getConnection();
        await connection.query(query, [name]);

        res.status(201).json({
            message: "Categoría creada",
        });
    } catch {
        res.send("Algo ha ido mal");
    }
});
