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
  res.json({ message: "Hola mundo" });
});

app.post("/add-project", function (req, res) {
  res.json({ message: "POST request" });
});

app.put("/modified-project", function (req, res) {
  res.json({
    message:
      "Con PUT modificamos un recurso, es decir un atributo de un registro, para ello, no sólo le pasamos el dato que queremos cambiar sino todos los valores de todos los campos pero con el que quiero, actualizado",
  });
});

app.delete("/add-project", function (req, res) {
  res.json({ message: "Con DELETE borramos un registro" });
});
