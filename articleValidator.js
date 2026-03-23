
//  validators/articleValidator.js  —  Règles de validation
//  Vérifie les données avant qu'elles atteignent le contrôleur
// ============================================================

const { body } = require('express-validator');

// Règles communes : utilisées pour POST et PUT
const reglesArticle = [

  body('titre')
    .notEmpty()
    .withMessage('Le titre est obligatoire')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Le titre doit contenir au moins 3 caractères'),

  body('contenu')
    .notEmpty()
    .withMessage('Le contenu est obligatoire')
    .trim()
    .isLength({ min: 10 })
    .withMessage('Le contenu doit contenir au moins 10 caractères'),

  body('auteur')
    .notEmpty()
    .withMessage("L'auteur est obligatoire")
    .trim(),

  body('categorie')
    .optional()
    .trim(),

  body('tags')
    .optional()
    .isArray()
    .withMessage('Les tags doivent être un tableau')
    .custom((tags) => tags.every(t => typeof t === 'string'))
    .withMessage('Chaque tag doit être une chaîne de caractères'),

];

module.exports = { reglesArticle };
