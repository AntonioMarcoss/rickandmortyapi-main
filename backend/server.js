
const express = require("express");
const cors = require("cors");
const compression = require("compression");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./src/routes/auth");
const dataRoutes = require("./src/routes/data");

const app = express();

app.use(cors());
app.use(compression());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/data", dataRoutes);

// Conexão com MongoDB com pool de conexões
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/rickdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 10, // pool de conexões
})
.then(() => console.log("MongoDB conectado"))
.catch((err) => console.error("Erro ao conectar no MongoDB:", err));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
