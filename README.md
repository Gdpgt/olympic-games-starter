# TéléSport — Jeux Olympiques

Application Angular affichant l'historique des médailles olympiques par pays :
un dashboard avec un graphique en camembert et des indicateurs, et une page de
détail par pays avec l'évolution des médailles édition par édition.

## Sommaire

- [Prérequis](#prérequis)
- [Installation](#installation)
- [Scripts](#scripts)
- [Fonctionnalités](#fonctionnalités)
- [Structure du projet](#structure-du-projet)
- [Choix techniques](#choix-techniques)
- [Captures d'écran](#captures-décran)

## Prérequis

- [Node.js](https://nodejs.org/) 18 ou supérieur (npm inclus).
- [Angular CLI](https://angular.dev/tools/cli) 18 : `npm install -g @angular/cli`.

## Installation

```bash
npm install
```

## Scripts

| Commande        | Description                                             |
| --------------- | ------------------------------------------------------ |
| `npm start`     | Serveur de dev sur http://localhost:4200/ (`ng serve`) |
| `npm run build` | Build de production dans `dist/` (`ng build`)          |
| `npm run watch` | Build en continu (mode développement)                  |
| `npm test`      | Tests unitaires (Karma + Jasmine)                      |

## Fonctionnalités

- **Dashboard** (`/`) : camembert du nombre total de médailles par pays, KPIs
  (nombre de pays, nombre de JOs). Un clic sur un pays ouvre sa page de détail.
- **Détail pays** (`/country/:id`) : KPIs (participations, total de médailles,
  total d'athlètes), courbe d'évolution des médailles par édition, bouton retour.
- **Gestion d'erreur** : URL inconnue ou identifiant de pays inexistant →
  redirection vers une page d'erreur claire.
- **Responsive** desktop / tablette / mobile et accessibilité de base (focus
  clavier visible, descriptions textuelles des graphiques).

## Structure du projet

```
src/app/
├── core/          # logique métier : models, services, constants
├── components/    # composants réutilisables (header)
└── pages/         # écrans routés (home, country, not-found)
```

Les données proviennent de `src/assets/mock/olympic.json`, mais transitent
uniquement par `OlympicService`, prêt à être branché sur une API REST.

Le détail de l'architecture est documenté dans [ARCHITECTURE.md](./ARCHITECTURE.md).

## Choix techniques

- **Angular 18** (architecture par modules), **Chart.js** pour les graphiques.
- **`OlympicService`** centralise les données via un `BehaviorSubject` chargé une
  seule fois au démarrage et partagé entre les pages.
- **Typage strict** : interfaces `Olympic` / `Participation` / `StatItem`, aucun
  `any`.
- **Observables** fermés automatiquement (`takeUntilDestroyed`).

## Captures d'écran

Les captures des deux pages (desktop et mobile) sont fournies dans un dossier
`screenshots/` compressé, à joindre au rendu.
