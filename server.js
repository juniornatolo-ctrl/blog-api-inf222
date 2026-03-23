// ============================================================
//  server.js  —  Point d'entrée de l'application
//  Lance le serveur Express sur le port 8080
// ============================================================

const app    = require('./app');
const PORT   = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log('');
  console.log('🚀  Blog API démarrée avec succès !');
  console.log(`📡  Serveur     : http://localhost:${PORT}`);
  console.log(`📚  Swagger UI  : http://localhost:${PORT}/api-docs`);
  console.log(`🗄️   Base de données SQLite initialisée`);
  console.log('');
});
