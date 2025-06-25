
const { body } = require("express-validator");

exports.loginValidator = [
  body("username").notEmpty().withMessage("Usuário é obrigatório."),
  body("password").notEmpty().withMessage("Senha é obrigatória.")
];

exports.dataValidator = [
  body("name").notEmpty().withMessage("Nome é obrigatório."),
  body("species").notEmpty().withMessage("Espécie é obrigatória."),
  body("image").isURL().withMessage("Imagem deve ser uma URL válida.")
];
