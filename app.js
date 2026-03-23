
//  app.js  —  Configuration centrale d'Express
//  Branche les middlewares, les routes et Swagger


const express        = require('express');
const cors           = require('cors');
const swaggerUi      = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');

const articleRoutes  = require('./routes/articleRoutes');

const app = express();

// ── Middlewares globaux 
app.use(cors());                           // Autorise les requêtes cross-origin
app.use(express.json());                   // Parse automatiquement le body JSON
app.use(express.urlencoded({ extended: true }));

// ── Documentation Swagger 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ── Routes de l'API 
app.use('/api/articles', articleRoutes);

// ── Route racine (accueil) 
app.get('/', (req, res) => {
  res.json({
    message : ' Blog API opérationnelle — INF222 EC1 Taf1',
    swagger : 'http://localhost:8080/api-docs',
    endpoints: {
      'POST   /api/articles'             : 'Créer un article',
      'GET    /api/articles'             : 'Lister tous les articles',
      'GET    /api/articles/search'      : 'Rechercher un article',
      'GET    /api/articles/:id'         : 'Obtenir un article par ID',
      'PUT    /api/articles/:id'         : 'Modifier un article',
      'DELETE /api/articles/:id'         : 'Supprimer un article',
    }
  });
});

// ── Gestionnaire d'erreurs global 
app.use((err, req, res, next) => {
  console.error(' Erreur serveur :', err.message);
  res.status(500).json({
    statut  : 500,
    erreur  : 'Erreur interne du serveur',
    message : err.message
  });
});

module.exports = app;
