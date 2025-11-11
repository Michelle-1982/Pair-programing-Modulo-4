const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

// Configuración para subir límite de respuesta
app.use(express.json({ limit: "25mb" }));
// Para evitar errores de diferente origen cuando se hace la petición
app.use(cors());

// Configuración para escuchar en el puerto definido
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// Endpoints
app.get("/", function (req, res) {
  res.send("sucess");
});

app.get("/user", function (req, res) {
  res.json({ name: "Lucía", age: 22, gender: "female" });
});

app.post("/add-user", function (req, res) {
  res.status(400).send("data is required");
});

app.put("/modify-user", function (req, res) {
  res.json({ name: "María", age: 42, gender: "female", status: "sucess" });
});

app.delete("/delete-user", function (req, res) {
  res.status(400).send("Ooppss something was wrong");
});
