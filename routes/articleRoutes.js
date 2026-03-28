const express = require('express');
const router = express.Router();
const {
    creerArticle,
    obtenirArticles
} = require('../controllers/articleController');

router.get('/, obtenirArticles');
router.post('/, creerArticle');

module.exports = router;
