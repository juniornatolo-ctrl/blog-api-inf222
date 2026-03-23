
//  config/database.js  —  Connexion et initialisation SQLite
//  Crée la base de données et les tables si elles n'existent pas

const Database = require('better-sqlite3');
const path     = require('path');

// Chemin vers le fichier SQLite (créé automatiquement)
const DB_PATH  = path.join(__dirname, '..', 'data', 'blogdb.sqlite');

// Ouvre (ou crée) la base de données
const db = new Database(DB_PATH, {
  verbose: console.log   // Affiche chaque requête SQL dans la console
});

// ── Création des tables 
// Appelée une seule fois au démarrage

function initDB() {

  // Table principale des articles
  db.exec(`
    CREATE TABLE IF NOT EXISTS articles (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      titre      TEXT    NOT NULL,
      contenu    TEXT    NOT NULL,
      auteur     TEXT    NOT NULL,
      date       TEXT    NOT NULL,
      categorie  TEXT,
      tags       TEXT     -- Stocké en JSON string : '["java","api"]'
    )
  `);

  // Insérer des articles de test si la table est vide
  const count = db.prepare('SELECT COUNT(*) AS n FROM articles').get();
  if (count.n === 0) {
    const insert = db.prepare(`
      INSERT INTO articles (titre, contenu, auteur, date, categorie, tags)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    insert.run(
      'Introduction à Node.js',
      'Node.js est un environnement JavaScript côté serveur basé sur le moteur V8 de Chrome. Il permet de créer des applications réseau rapides et scalables.',
      'NATOLO JUNIOR',
      new Date('2026-03-10T09:00:00').toISOString(),
      'Tech',
      JSON.stringify(['nodejs', 'javascript', 'backend'])
    );

    insert.run(
      'Les bases de l\'API REST',
      'Une API REST utilise les méthodes HTTP (GET, POST, PUT, DELETE) pour manipuler des ressources identifiées par des URLs.',
      'Alice Dupont',
      new Date('2026-03-15T14:30:00').toISOString(),
      'Tech',
      JSON.stringify(['api', 'rest', 'http'])
    );

    insert.run(
      'Bien démarrer avec Git',
      'Git est un système de contrôle de version distribué. Les commandes essentielles sont : git init, add, commit, push, pull.',
      'Bob Martin',
      new Date('2026-03-18T11:00:00').toISOString(),
      'DevOps',
      JSON.stringify(['git', 'vcs', 'collaboration'])
    );

    console.log('Données de test insérées avec succès !');
  }

  console.log('Base de données initialisée :', DB_PATH);
}

initDB();

module.exports = db;
