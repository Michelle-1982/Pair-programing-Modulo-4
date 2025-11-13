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

app.get("/product", async (req, res) => {
    try {
        const id = 2;
        const query = "SELECT * FROM products WHERE id_product = ?";

        const connection = await mysql.getConnection();
        // ("SELECT * FROM products WHERE id_product = ?", [1])
        const data = await connection.query(query, [id]);
        res.json(data[0]);
    } catch {
        res.send("Algo ha ido mal");
    }
});
