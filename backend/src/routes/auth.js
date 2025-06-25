
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { loginValidator } = require("../middleware/validators");
const { validationResult } = require("express-validator");
const User = require("../models/User");

const router = express.Router();

router.post("/login", loginValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "secret-key", { expiresIn: "1h" });
  res.json({ token });
});

module.exports = router;
