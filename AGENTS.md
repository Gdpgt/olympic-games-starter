# Olympic Games Starter (TéléSport) — AGENTS.md

Source canonique partagée entre agents (Claude Code, Codex, Antigravity…).

> **Détail complet et exhaustif des attendus : voir les briefs `docs/oc/`** (source
> de vérité, à consulter au besoin). La synthèse ci-dessous ne remplace pas les
> briefs — en cas de doute sur ce qu'OpenClassrooms demande, lire `docs/oc/`.

## Mission

Projet de formation OpenClassrooms « TéléSport » (chaîne TV) — section « Jeux
Olympiques », front Angular 18. Deux temps :

1. **Refactoring** du starter dégradé vers une architecture propre : dossiers
   `pages/`, `components/`, `core/` (`services/`, `models/`), un `DataService`
   centralisant l'accès aux données, des interfaces `Olympic` / `Participation`,
   zéro `any`, observables correctement détruits.
2. **Implémentation de l'UI** :
   - **Dashboard** (route par défaut `/`) : texte de contexte, pie chart du nombre
     de médailles par pays (toutes années), KPIs (nombre de pays, nombre de JOs)
     affichés via un composant réutilisable d'en-tête (titre + liste d'indicateurs
     libellé/valeur) ; clic sur un pays → `/country/:id`.
   - **Page détail** `/country/:id` : KPIs (participations, total médailles,
     athlètes) via le même composant d'en-tête, graphique d'évolution (line) par
     édition, bouton retour vers `/` (`ActivatedRoute` pour l'id).
   - **Gestion d'erreurs** : `NotFoundComponent`, route `**`, id/URL invalide →
     message clair (jamais de message technique) + redirection.
   - **Responsive** desktop / tablette / mobile et **accessibilité** de base.

Données simulées : `src/assets/mock/olympic.json` (récupérées via le service ;
dans les projets suivants ce sera une vraie API REST).

## Commandes

- `npm install` — installer les dépendances.
- `npm start` (`ng serve`) — serveur de dev sur http://localhost:4200/.
- `npm run build` (`ng build`) — build dans `dist/`.
- `npm test` (`ng test`) — tests unitaires (Karma + Jasmine).

## Contraintes (étiquetées par source)

- Aucun `any` — typer via les interfaces de `models/`. `[BRIEF]` `[SPECS]`
- `DataService` centralise les données ; **zéro tableau en dur** dans les
  composants ; service `providedIn: 'root'`. `[BRIEF]`
- Interfaces TypeScript `Olympic` / `Participation` dans `models/`. `[SPECS]`
- Observables : désinscription systématique (`takeUntil` / `async` pipe). `[BRIEF]`
- Responsive : desktop ≥ 1200px, tablette 768–1199px, mobile ≤ 767px. `[SPECS]`
- Accessibilité : contrastes AA, focus visibles, `aria-label` sur boutons/icônes,
  descriptions textuelles des graphes. `[SPECS]`
- Total médailles = or + argent + bronze ; tri cohérent dashboard ↔ détail. `[SPECS]`
- Fichiers < 300 lignes *idéalement* ; factorisation des constantes. `[SPECS]`
- Commits atomiques, messages clairs au format Conventional Commits. `[BONNE PRATIQUE]`

## Zones

- **Immuable** : `docs/oc/` (briefs OpenClassrooms — jamais modifiés).
- **Source de données** : `src/assets/mock/olympic.json` (ne pas réécrire).
- **Config — demander avant de modifier** : `angular.json`, `tsconfig*.json`,
  `package.json`.
