// ============================================================
//  models/articleModel.js  —  Couche Modèle
//  Toutes les requêtes SQL vers la table articles
// ============================================================

const db = require('../config/database');

// ── Utilitaire : convertit les tags JSON ↔ tableau ───────────

function parseArticle(article) {
  if (!article) return null;
  return {
    ...article,
    tags: article.tags ? JSON.parse(article.tags) : []
  };
}

function parseArticles(articles) {
  return articles.map(parseArticle);
}

// ── CRÉER un article ─────────────────────────────────────────

function creerArticle({ titre, contenu, auteur, categorie, tags }) {
  const stmt = db.prepare(`
    INSERT INTO articles (titre, contenu, auteur, date, categorie, tags)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    titre,
    contenu,
    auteur,
    new Date().toISOString(),              // date automatique
    categorie || null,
    tags ? JSON.stringify(tags) : '[]'
  );

  // Retourner l'article créé avec son ID auto-généré
  return obtenirArticleParId(result.lastInsertRowid);
}

// ── LIRE tous les articles (avec filtres optionnels) ─────────

function obtenirArticles({ categorie, auteur, date } = {}) {
  let query  = 'SELECT * FROM articles WHERE 1=1';
  const params = [];

  if (categorie) {
    query += ' AND LOWER(categorie) = LOWER(?)';
    params.push(categorie);
  }

  if (auteur) {
    query += ' AND LOWER(auteur) = LOWER(?)';
    params.push(auteur);
  }

  if (date) {
    // Retourne les articles dont la date est >= à la date fournie
    query += ' AND date >= ?';
    params.push(new Date(date).toISOString());
  }

  query += ' ORDER BY date DESC';

  const articles = db.prepare(query).all(...params);
  return parseArticles(articles);
}

// ── LIRE un article unique par son ID ────────────────────────

function obtenirArticleParId(id) {
  const article = db.prepare('SELECT * FROM articles WHERE id = ?').get(id);
  return parseArticle(article);
}

// ── MODIFIER un article ──────────────────────────────────────

function modifierArticle(id, { titre, contenu, auteur, categorie, tags }) {
  const stmt = db.prepare(`
    UPDATE articles
    SET titre = ?, contenu = ?, auteur = ?, categorie = ?, tags = ?
    WHERE id = ?
  `);

  const result = stmt.run(
    titre,
    contenu,
    auteur,
    categorie || null,
    tags ? JSON.stringify(tags) : '[]',
    id
  );

  if (result.changes === 0) return null;   // Aucune ligne modifiée → ID inexistant
  return obtenirArticleParId(id);
}

// ── SUPPRIMER un article ─────────────────────────────────────

function supprimerArticle(id) {
  const result = db.prepare('DELETE FROM articles WHERE id = ?').run(id);
  return result.changes > 0;               // true si supprimé, false si inexistant
}

// ── RECHERCHER dans titre et contenu ─────────────────────────

function rechercherArticles(query) {
  const terme = `%${query}%`;
  const articles = db.prepare(`
    SELECT * FROM articles
    WHERE LOWER(titre) LIKE LOWER(?)
       OR LOWER(contenu) LIKE LOWER(?)
    ORDER BY date DESC
  `).all(terme, terme);
  return parseArticles(articles);
}

module.exports = {
  creerArticle,
  obtenirArticles,
  obtenirArticleParId,
  modifierArticle,
  supprimerArticle,
  rechercherArticles
};
