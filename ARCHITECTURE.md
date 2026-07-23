# Architecture — TéléSport (Jeux Olympiques)

Ce document décrit l'organisation du front-end Angular après refactoring : la
structure des dossiers, le rôle de chaque brique, et la façon dont les données
circulent. Il prépare aussi le terrain pour une future connexion à une API REST.

## Vue d'ensemble

Application Angular 18 (module `AppModule`, pas de standalone), routée en SPA. Les
données sont pour l'instant mockées dans `src/assets/mock/olympic.json` mais
transitent **exclusivement** par un service, exactement comme le ferait une API
REST.

## Arborescence

```
src/app/
├── app-routing.module.ts        # routes de l'application
├── app.component.*              # racine : <router-outlet> + chargement initial
├── app.module.ts                # déclarations + provideHttpClient
│
├── core/                        # logique métier, sans UI
│   ├── models/
│   │   ├── olympic.ts           # interface Olympic
│   │   ├── participation.ts     # interface Participation
│   │   └── stat-item.ts         # interface StatItem (indicateur libellé/valeur)
│   ├── services/
│   │   └── olympic.service.ts   # accès centralisé aux données
│   └── constants/
│       └── chart-colors.ts      # palette de couleurs des graphiques
│
├── components/                  # composants réutilisables (UI pure)
│   └── header/                  # en-tête : titre + liste d'indicateurs
│
└── pages/                       # composants routés (un par écran)
    ├── home/                    # dashboard : pie chart + KPIs
    ├── country/                 # détail pays : line chart + KPIs
    └── not-found/               # page d'erreur
```

## Rôle des dossiers

- **`core/`** — tout ce qui ne dépend pas de l'affichage : interfaces de données
  (`models/`), accès aux données (`services/`), constantes partagées
  (`constants/`). C'est le point de contact avec le back-end à venir.
- **`components/`** — composants d'UI réutilisables, sans logique métier, pilotés
  par leurs `@Input()`. Le `HeaderComponent` affiche un titre et itère sur une
  liste de `StatItem` (libellé/valeur) ; il est réutilisé par le dashboard et la
  page détail.
- **`pages/`** — un composant par écran, câblé au routing. Chaque page récupère
  ses données via le service et construit son graphique.

## Le service : `OlympicService`

`providedIn: 'root'` (singleton). Il centralise l'accès aux données selon le
pattern **BehaviorSubject + chargement au démarrage** :

1. `AppComponent` appelle `loadInitialData()` **une seule fois** au démarrage.
2. Le service fait le `HttpClient.get<Olympic[]>` et pousse le résultat dans un
   `BehaviorSubject<Olympic[] | null>` (`null` = pas encore chargé).
3. Les pages s'abonnent à `getOlympics()` (l'`Observable` en lecture seule). Le
   `BehaviorSubject` **rejoue** sa dernière valeur : peu importe quand une page
   s'abonne, elle obtient immédiatement les données déjà chargées.

Avantages : les données sont chargées **une fois** et partagées (pas de re-fetch à
chaque navigation), l'état a une source unique, et la bascule vers une vraie API
REST se limitera à changer l'URL dans le service — les composants restent
inchangés.

Les souscriptions dans les composants sont fermées automatiquement via
`takeUntilDestroyed(DestroyRef)`, évitant les fuites mémoire.

## Modèles

- `Olympic` : `{ id, country, participations: Participation[] }`.
- `Participation` : `{ id, year, city, medalsCount, athleteCount }`.
- `StatItem` : `{ label, value }` — indicateur générique affiché par le header.

Aucun `any` : toutes les données sont typées par ces interfaces.

## Routing et gestion d'erreur

| Route            | Composant           | Rôle                                   |
| ---------------- | ------------------- | -------------------------------------- |
| `''`             | `HomeComponent`     | dashboard (route par défaut)           |
| `country/:id`    | `CountryComponent`  | détail d'un pays par identifiant       |
| `not-found`      | `NotFoundComponent` | page d'erreur                          |
| `**`             | `NotFoundComponent` | toute URL inconnue                     |

La page détail lit l'`id` via `ActivatedRoute` et recherche le pays dans les
données du service. Si l'`id` ne correspond à aucun pays (URL saisie à la main,
identifiant inexistant), l'utilisateur est redirigé vers `NotFoundComponent` — pas
d'écran vide ni de message technique.

## Graphiques

Chart.js (pie sur le dashboard, line sur la page détail). Les graphiques sont
construits dans `ngAfterViewInit` pour garantir la présence du `<canvas>` dans le
DOM au moment de l'instanciation (le `BehaviorSubject` pouvant émettre de façon
synchrone si les données sont déjà en cache). La palette est factorisée dans
`core/constants/chart-colors.ts`.
