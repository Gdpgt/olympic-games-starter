# Architecture - TéléSport (Jeux Olympiques)

Ce document décrit l'organisation du front-end Angular après refactoring : la
structure des dossiers, le rôle de chaque brique, et la façon dont les données
circulent. Il prépare aussi le terrain pour une future connexion à une API REST.

## Vue d'ensemble

Application Angular 18 (SPA).
Les données sont pour l'instant mockées dans `src/assets/mock/olympic.json` mais
transitent exclusivement par un service, comme le ferait une API REST.

## Arborescence

```
src/app/
├── app-routing.module.ts        # routes de l'application
├── app.component.*              # racine <router-outlet> + chargement initial
├── app.module.ts                # déclarations
│
├── core/                        # logique métier
│   ├── models/
│   │   ├── olympic.ts           # interface Olympic
│   │   ├── participation.ts     # interface Participation
│   │   └── stat-item.ts         # interface StatItem (indicateur libellé/valeur)
│   ├── services/
│   │   └── olympic.service.ts   # le DataService : accès centralisé aux données
│   └── constants/
│       └── chart-colors.ts      # palette de couleurs des graphiques factorisées
│
├── components/                  # composants réutilisables (UI)
│   ├── header/                  # titre + stats
│   └── loading/                 # indicateur de chargement (spinner)
│
└── pages/                       # composants routés (un par écran)
    ├── home/                    # dashboard : pie chart + stats
    ├── country/                 # détail pays : line chart + stats
    ├── not-found/               # page d'erreur : page ou pays inexistant
    └── data-unavailable/        # page d'erreur : données indisponibles
```

## Rôle des dossiers

- `core/` - tout ce qui ne dépend pas de l'affichage : interfaces de données
  (`models/`), accès aux données (`services/`), constantes partagées
  (`constants/`). C'est le point de contact avec le back-end à venir.
- `components/` - composants d'UI réutilisables, sans logique métier.
  Le `HeaderComponent` affiche un titre et itère sur une
  liste de `StatItem` (libellé/valeur) ; il est réutilisé par le dashboard et la
  page détail. Le `LoadingComponent` affiche un spinner et le texte « Loading
  data... » (`role="status"` pour les lecteurs d'écran) ; les deux pages
  l'affichent tant que les données ne sont pas chargées.
- `pages/` - un composant par écran, câblé au routing. Chaque page récupère
  ses données via le service et construit son graphique.

## Le DataService : OlympicService

`providedIn: 'root'` (singleton). Il centralise l'accès aux données selon le
pattern BehaviorSubject + chargement au démarrage :

1. `AppComponent` appelle `loadInitialData()` une seule fois au démarrage.
2. Le service fait le `HttpClient.get<Olympic[]>` et pousse le résultat dans un
   `BehaviorSubject<Olympic[] | null>`. Trois états possibles :
   - `null` : chargement en cours (état initial) ;
   - `[]` : aucune donnée, soit parce que le chargement a échoué (l'erreur est
     tracée en `console.error` pour les développeurs), soit parce que le fichier
     est vide ;
   - tableau non vide : données disponibles.
3. Les pages s'abonnent à `getOlympics()` (l'`Observable` en lecture seule). Le
   `BehaviorSubject` rejoue sa dernière valeur : peu importe quand une page
   s'abonne, elle obtient immédiatement les données déjà chargées.

Avantages : les données sont chargées une fois et partagées (pas de re-fetch à
chaque navigation), et la bascule vers une vraie API REST se limitera à changer
l'URL dans le service.

Les souscriptions dans les composants sont fermées automatiquement via
`takeUntilDestroyed(DestroyRef)`, évitant les fuites mémoire.

## Modèles

- `Olympic` : `{ id, country, participations: Participation[] }`.
- `Participation` : `{ id, year, city, medalsCount, athleteCount }`.
- `StatItem` : `{ label, value }` — indicateur générique affiché par le header.

Aucun `any` : toutes les données sont typées par ces interfaces.

## Routing et gestion d'erreur

| Route              | Composant                  | Rôle                             |
| ------------------ | -------------------------- | -------------------------------- |
| `''`               | `HomeComponent`            | dashboard (route par défaut)     |
| `country/:id`      | `CountryComponent`         | détail d'un pays par identifiant |
| `not-found`        | `NotFoundComponent`        | page ou pays inexistant          |
| `data-unavailable` | `DataUnavailableComponent` | données indisponibles            |
| `**`               | `NotFoundComponent`        | toute URL inconnue               |

Chaque page vérifie elle-même l'état des données reçues du service :

| Cas                   | Détection                                           | Affichage                       |
| --------------------- | --------------------------------------------------- | ------------------------------- |
| Chargement en cours   | le service émet `null`                              | `LoadingComponent` (spinner)    |
| Mauvaise URL          | route `**`                                          | `NotFoundComponent`             |
| ID invalide           | `CountryComponent` : aucun pays ne correspond à l'`id` lu via `ActivatedRoute` | `NotFoundComponent` |
| Données manquantes    | Home ou Country : le service émet `[]`              | `DataUnavailableComponent`      |

Deux pages d'erreur distinctes, car ce sont deux situations différentes : ce que
l'utilisateur demande n'existe pas (équivalent d'une erreur HTTP 404), ou les
données n'ont pas pu être chargées (équivalent d'une erreur 503). Chacune affiche
un message clair, sans détail technique : `NotFoundComponent` propose un lien « Go
back » vers le dashboard, `DataUnavailableComponent` un bouton « Try again » qui
recharge la page.

Les redirections utilisent `router.navigate([...], { skipLocationChange: true })` :
la page d'erreur s'affiche mais la barre d'adresse garde l'URL saisie, comme pour la
route `**` et comme le ferait un serveur qui renvoie une 404. Un rafraîchissement
(F5) relance donc le chargement de la page réellement demandée. La mise en page
commune aux deux pages d'erreur est factorisée dans la classe globale `.error-page`
(`src/styles.scss`).

## Graphiques

Chart.js (pie sur le dashboard, line sur la page détail). Les graphiques sont
construits dans `ngAfterViewInit` pour garantir la présence du `<canvas>` dans le
DOM au moment de l'instanciation (le `BehaviorSubject` pouvant émettre de façon
synchrone si les données sont déjà en cache). La palette de couleurs est factorisée dans
`core/constants/chart-colors.ts`.

## Responsive

Approche mobile-first. Les paliers de la spécification sont factorisés dans le partial
`src/styles/_breakpoints.scss` : mobile par défaut (≤ 767px), mixin `tablet-up`
(≥ 768px) et mixin `desktop` (≥ 1200px). Chaque feuille de style l'importe via
`@use` et déclare ses règles dans cet ordre : base, tablette, puis desktop.

- `.chart-container` est une classe **globale** (`src/styles.scss`) partagée par
  les pages à graphique : sa hauteur suit les paliers (300 / 380 / 350px) et
  Chart.js (`responsive: true`, `maintainAspectRatio: false`) s'y adapte.
