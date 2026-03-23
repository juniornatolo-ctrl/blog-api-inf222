
//  controllers/articleController.js  —  Couche Contrôleur
//  Reçoit les requêtes HTTP, appelle le Modèle, renvoie les réponses


const { validationResult } = require('express-validator');
const Article = require('../models/articleModel');

// ── POST /api/articles  —  Créer un article

const creerArticle = (req, res) => {
  // 1. Vérifier les erreurs de validation (voir les règles dans les routes)
  const erreurs = validationResult(req);
  if (!erreurs.isEmpty()) {
    return res.status(400).json({
      statut  : 400,
      erreur  : 'Validation échouée',
      details : erreurs.array()                // Liste des champs invalides
    });
  }

  try {
    const { titre, contenu, auteur, categorie, tags } = req.body;
    const article = Article.creerArticle({ titre, contenu, auteur, categorie, tags });

    return res.status(201).json(article);      // 201 Created
  } catch (err) {
    return res.status(500).json({
      statut  : 500,
      erreur  : 'Erreur serveur lors de la création',
      message : err.message
    });
  }
};

// ── GET /api/articles  —  Lister les articles 

const obtenirArticles = (req, res) => {
  try {
    const { categorie, auteur, date } = req.query;
    const articles = Article.obtenirArticles({ categorie, auteur, date });

    return res.status(200).json(articles);     // 200 OK
  } catch (err) {
    return res.status(500).json({
      statut  : 500,
      erreur  : 'Erreur serveur lors de la récupération',
      message : err.message
    });
  }
};

// ── GET /api/articles/search  —  Rechercher 

const rechercherArticles = (req, res) => {
  const { query } = req.query;

  // Vérifier que le paramètre query est fourni
  if (!query || query.trim() === '') {
    return res.status(400).json({
      statut : 400,
      erreur : "Le paramètre 'query' est requis et ne peut pas être vide"
    });
  }

  try {
    const articles = Article.rechercherArticles(query.trim());
    return res.status(200).json(articles);     // 200 OK
  } catch (err) {
    return res.status(500).json({
      statut  : 500,
      erreur  : 'Erreur serveur lors de la recherche',
      message : err.message
    });
  }
};

// ── GET /api/articles/:id  —  Obtenir un article

const obtenirArticleParId = (req, res) => {
  try {
    const id      = parseInt(req.params.id);
    const article = Article.obtenirArticleParId(id);

    if (!article) {
      return res.status(404).json({
        statut : 404,
        erreur : `Article avec l'id ${id} introuvable`
      });
    }

    return res.status(200).json(article);      // 200 OK
  } catch (err) {
    return res.status(500).json({
      statut  : 500,
      erreur  : 'Erreur serveur',
      message : err.message
    });
  }
};

// ── PUT /api/articles/:id  —  Modifier un article 

const modifierArticle = (req, res) => {
  // 1. Vérifier les erreurs de validation
  const erreurs = validationResult(req);
  if (!erreurs.isEmpty()) {
    return res.status(400).json({
      statut  : 400,
      erreur  : 'Validation échouée',
      details : erreurs.array()
    });
  }

  try {
    const id = parseInt(req.params.id);
    const { titre, contenu, auteur, categorie, tags } = req.body;

    const article = Article.modifierArticle(id, { titre, contenu, auteur, categorie, tags });

    if (!article) {
      return res.status(404).json({
        statut : 404,
        erreur : `Article avec l'id ${id} introuvable`
      });
    }

    return res.status(200).json(article);      // 200 OK
  } catch (err) {
    return res.status(500).json({
      statut  : 500,
      erreur  : 'Erreur serveur lors de la modification',
      message : err.message
    });
  }
};

// ── DELETE /api/articles/:id  —  Supprimer un article 

const supprimerArticle = (req, res) => {
  try {
    const id      = parseInt(req.params.id);
    const supprime = Article.supprimerArticle(id);

    if (!supprime) {
      return res.status(404).json({
        statut : 404,
        erreur : `Article avec l'id ${id} introuvable`
      });
    }

    return res.status(200).json({
      message : `Article ${id} supprimé avec succès`
    });
  } catch (err) {
    return res.status(500).json({
      statut  : 500,
      erreur  : 'Erreur serveur lors de la suppression',
      message : err.message
    });
  }
};

module.exports = {
  creerArticle,
  obtenirArticles,
  rechercherArticles,
  obtenirArticleParId,
  modifierArticle,
  supprimerArticle
};
