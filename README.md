 Blog API — INF222 EC1 TAF1

API REST backend pour la gestion d'un blog simple, développée avec Node.js (Express) et SQLite.

---
  Installation et démarrage

 Prérequis
- Node.js >= 16
- npm

 Étapes


 1. Cloner le dépôt
git clone https://github.com/natolo_junior/blog-api.git
cd blog-api

 2. Installer les dépendances
npm install

 3. Démarrer le serveur
npm start
 ou en mode développement (rechargement automatique)
npm run dev
```

Le serveur démarre sur **http://localhost:3000**

 Documentation Swagger

Accessible à : **http://localhost:3000/api-docs**



 Endpoints de l'API

 Base URL : `http://localhost:3000/api`

| Méthode | Endpoint                         | Description                        |
|---------|----------------------------------|------------------------------------|
| GET     | `/articles`                      | Lister tous les articles           |
| GET     | `/articles?categorie=Tech`       | Filtrer par catégorie              |
| GET     | `/articles?auteur=Jean`          | Filtrer par auteur                 |
| GET     | `/articles?date=2026-03-18`      | Filtrer par date                   |
| GET     | `/articles/search?query=texte`   | Rechercher dans titre/contenu      |
| GET     | `/articles/:id`                  | Récupérer un article par ID        |
| POST    | `/articles`                      | Créer un nouvel article            |
| PUT     | `/articles/:id`                  | Modifier un article                |
| DELETE  | `/articles/:id`                  | Supprimer un article               |


 Exemples d'utilisation
 Créer un article

curl -X POST http://localhost:3000/api/articles \
  -H "Content-Type: application/json" \
  -d '{
    "titre": "Introduction à Node.js",
    "contenu": "Node.js est un environnement JavaScript côté serveur basé sur V8...",
    "auteur": "Jean Dupont",
    "categorie": "Tech",
    "tags": ["nodejs", "javascript", "backend"]
  }'

Réponse (201) :
```json
{
  "success": true,
  "message": "Article créé avec succès",
  "data": {
    "id": 1,
    "titre": "Introduction à Node.js",
    "contenu": "Node.js est un environnement JavaScript...",
    "auteur": "NATOLO JUNIOR",
    "categorie": "Tech",
    "tags": ["nodejs", "javascript", "backend"],
    "date": "2026-03-18T10:00:00.000Z",
    "createdAt": "2026-03-18 10:00:00",
    "updatedAt": "2026-03-18 10:00:00"
  }
}


 Récupérer tous les articles
bash
curl http://localhost:3000/api/articles
```

Filtrer par catégorie et date
bash
curl "http://localhost:3000/api/articles?categorie=Tech&date=2026-03-18"
```
 Récupérer un article par ID
bash
curl http://localhost:3000/api/articles/1
```

 Rechercher des articles
```bash
curl "http://localhost:3000/api/articles/search?query=javascript"
```

Modifier un article
```bash
curl -X PUT http://localhost:3000/api/articles/1 \
  -H "Content-Type: application/json" \
  -d '{
    "titre": "Introduction à Node.js – Version mise à jour",
    "categorie": "Backend"
  }'
```

 Supprimer un article
```bash
curl -X DELETE http://localhost:3000/api/articles/1
```

---

 Structure du projet

```
blog-api/
├── src/
│   ├── app.js                 # Point d'entrée principal
│   ├── config/
│   │   └── database.js        # Configuration SQLite
│   ├── controllers/
│   │   └── articleController.js  # Logique métier
│   ├── middlewares/
│   │   └── validation.js      # Validation des entrées
│   ├── models/
│   │   └── articleModel.js    # Accès base de données
│   └── routes/
│       └── articleRoutes.js   # Définition des routes
├── swagger/
│   └── swagger.yaml           # Documentation OpenAPI 3.0
├── data/                      # Base de données SQLite (créée automatiquement)
├── package.json
└── README.md
```

---

 Codes HTTP utilisés

| Code | Signification                |
|------|------------------------------|
| 200  | OK – Succès                  |
| 201  | Created – Création réussie   |
| 400  | Bad Request – Données invalides |
| 404  | Not Found – Article inexistant |
| 500  | Internal Server Error        |

---

Technologies

- Runtime: Node.js
- Framework: Express.js
- Base de données : SQLite (better-sqlite3)
- Documentation: Swagger UI (OpenAPI 3.0)
- Validation: express-validator
- CORS: cors

---

 Contexte académique

UE : INF222 – EC1 (Développement Backend)  
TAF : TAF1 – Programmation Web  
Encadrant: Charles Njiosseu, PhD 
