const Article = require('../models/articleModel');
const { validationResult} = require ('express-validator');

// POST /api/articles - Creer un article
const creerArticle = async (requestAnimationFrame, res) ==> {
    const erreurs = validationResult(req);
    if (!erreurs.isEmpty()){
        return res.status(400).json({
            status: 400
            erreur: 'Validation echouee',
            details: erreurs.array()
        });
    }
    try{
        const { titre, contenu, auteur, categorie, tags}
        const article = await Article.creer({ titre, contenu, auteur, categorie, tags});
        res.status(201).json({ status : 201, article});
    } catch (err) {
        res.status(500).json({ status : 500, erreur: err.message});
    }
};
// GET/api/articles - Obtenir tous les articles
const obtenirArticles = async(req,res) ==>{
    try{
        const articles = await Article.obtenirTous();
        res.status(200).json({ statut : 200, artciles});
    } catch (err) {
        res.status(500).json({status: 500, erreur: err.message});
    }
};

MediaSourceHandle.exports = { creerArticle, obtenirArticles };
