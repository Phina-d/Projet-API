# 📋 React User Management App

Une application React permettant d'afficher, rechercher, ajouter et consulter des détails sur des utilisateurs grâce à l'API JSONPlaceholder. Elle inclut également un **mode sombre/clair**, une **navigation avec React Router**, et une interface moderne avec **Bootstrap** et **React Icons**.

## 🚀 Fonctionnalités principales

- 🔄 **Chargement des utilisateurs** depuis une API externe
- 🔍 **Recherche instantanée** par nom
- ➕ **Ajout d’un utilisateur** via formulaire (simulation locale)
- 🌓 **Mode sombre / clair** avec icônes dynamiques
- 📑 **Pagination** simple
- 🔎 **Affichage détaillé** de l’utilisateur dans une **modal**
- 🧭 **Navigation** via React Router (`Accueil`, `À propos`)
- 📱 **Interface responsive** avec Bootstrap
- 🎨 **Couleur d’avatar aléatoire** basée sur le nom

## 📦 Technologies utilisées

- [React](https://reactjs.org/)
**React Router DOM** | Navigation entre pages (`/`, `/about`) |
- [React Router](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- [Bootstrap](https://getbootstrap.com/)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [React Icons](https://react-icons.github.io/react-icons/)
- API : [JSONPlaceholder](https://jsonplaceholder.typicode.com/)

## 📁 Structure du projet

/mon-projet/
│
├── /public/
│    └── index.html           # fichier HTML principal
│
├── /src/
│    ├── /components/         # composants réutilisables
│    │     ├── Navbar.js      # Barre de navigation
│    │     ├── Navbar.css
│    │     ├── Footer.js      # Pied de page
│    │     └── Footer.css
│    │
│    ├── /pages/              # pages accessibles via le router
│    │     ├── Home.js        # Page principale avec liste, recherche, formulaire, détails
│    │     └── About.js       # Page "À propos"
│    │
│    ├── /services/           # appels API (optionnel)
│    │     └── api.js         # exemple pour axios
│    │
│    ├── UserList.js          # composant liste d’utilisateurs
│    ├── App.js               # composant racine
│    ├── App.css              # styles globaux
│    └── index.js             # point d’entrée React
│
├── package.json
└── README.md


⚙️ Fonctionnement
À l’ouverture, l’app récupère les utilisateurs depuis https://jsonplaceholder.typicode.com/users.

L’utilisateur peut :

Chercher un nom (filtrage en direct)

Cliquer sur une carte pour voir les détails

Passer du mode clair au sombre

Ajouter un utilisateur (simulé, local)

Naviguer entre pages avec la barre de navigation

Les cartes sont paginées par groupes de 6 utilisateurs.

Chaque avatar est généré avec une couleur unique basée sur le nom de l’utilisateur.

Remarques
Le formulaire d’ajout d’utilisateur n’envoie pas réellement de données à l’API (car JSONPlaceholder est en lecture seule).

L’utilisateur ajouté est affiché localement dans la liste.

L’application est idéale comme base pédagogique ou pour un portfolio.

Autrice
Développé avec ❤️ par [Phina DIOUF]
Lien vers le dépôt GitHub : https://github.com/Phina-d/Projet-API.git
