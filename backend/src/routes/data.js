
const express = require("express");
const { dataValidator } = require("../middleware/validators");
const { validationResult } = require("express-validator");
const authMiddleware = require("../middleware/authMiddleware");
const Data = require("../models/Data");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  const data = await Data.find();
  console.log("Busca realizada por:", req.userId);
  res.json(data);
});

router.post("/", authMiddleware, dataValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, species, image } = req.body;
  const newData = new Data({ name, species, image });
  await newData.save();
  console.log("Novo dado inserido por:", req.userId);
  res.status(201).json(newData);
});

module.exports = router;


router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Data.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    console.error("Erro ao deletar:", err);
    res.status(500).json({ error: "Erro ao deletar personagem" });
  }
});
