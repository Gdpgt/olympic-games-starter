## Problèmes d'architecture et mauvaises pratiques observés + commentaires (catégorisés, priorisés)

### Erreurs relevées dans country.component.ts et home.component.ts :

1. De nombreuses variables ne sont pas strictement typées, elles sont de type 'any'. Le risque est
   que la compilation ne relève pas des bugs que l'on pourrait ainsi rencontrer plus tard en production.
   Il faudrait donc avoir des interfaces dans /models qui pourront remplacer les 'any'.

2. Les 2 component.ts définissent la propriété olympicUrl puis font un appel http pour récupérer les
   données, alors que cela devrait être la responsabilité d'une classe dédiée OlympicService par exemple

3. Des console.log sont toujours présents alors qu'ils auraient dû être enlevé après la phase de debuggage. Et les console.log présents dans les chemins d'erreur devraient être en console.error() à la place

4. Les Observables créés via subscribe ne sont jamais fermés : lorsque le composant est détruit, ils
   peuvent créer des fuites de mémoire (erreurs invisibles qui gaspillent de la RAM). Il faudrait ajouter
   "takeUntilDestroyed(this.destroyRef)" dans le .pipe() pour que l'unsubscribe ait lieu au moment du
   changement de page et donc de la destruction du composant.

5. La ligne "const selectedCountry = data.find((i: any) => i.country === countryName);"
   dans country.component.ts n'affiche pas la page d'erreur "Not Found" si jamais le user a modifié
   l'url manuellement pour y mettre un nom de pays qui n'existe pas en base, et l'absence de "?"
   ligne 31 enclenche la levée de l'exception qui fait crasher l'app.

6. Le calcul du nombre de médaille est dupliqué dans les deux composants, il faudrait créer une
   classe OlympicService dans laquelle on aurait une méthode getTotalMedals et getTotalMedalsPerCountry
   que les composants pourraient appeler après leur avoir injecté le service en dépendance via le constructeur

7. "countryName: string" devrait être "id: int" selon les spécifications

8. Les erreurs ne sont qu'assignées à une variable, sans console.error pour les développeurs,
   ni de redirection ou d'enclenchement d'une erreur qui s'afficherait dans le html

### Erreurs relevées dans country.component.html et home.component.html et fichiers scss :

1. {{ pieChart / linechart }} n'ont rien à faire entre les balises <canvas>. Si l'intention est
   d'afficher le graphique, mettre l'id au sein de la balise gauche comme cela a été fait suffit ; si
   l'intention est d'afficher un message d'accessibilité, cela se fait plutôt via un message associé
   à l'attribut aria-label à côté de l'id.

2. (quasi) aucune media-query n'existe dans les fichiers .scss, ce qui signifie que
   l'application n'est pas responsive. Et aucun aria-labels n'existe dans les fichiers html, donc l'application ne respecte pas les recommandations d'accessibilité

3. La balise "<h2>Date</h2>" n'a rien à faire là dans country.component.html. Si l'intention était d'ajouter un texte sous l'axe des abscisses, il aurait fallu l'ajouter en option dans la fonction buildChart() du country.component.ts.

### Autres :

- Un composant header pourrait être créé pour éviter la redondance dans les 2 fichiers home.hmtl et country.html (titre + KPIs)

## Architecture cible

_réalisée via https://tree.nathanfriend.com_

Légende :

- ✨ : Nouveaux dossiers et fichiers à créer
- ♻️ : Fichiers existants à nettoyer et refactoriser
- 📦 : Fichiers existants à conserver tels quels

```
src/
├── 📦 favicon.ico
├── 📦 index.html
├── 📦 main.ts
├── 📦 polyfills.ts
├── 📦 styles.scss
├── 📦 test.ts
│
├── app/
│   ├── ♻️ app-routing.module.ts        # routes (Va être modifié pour la route country/:id)
│   ├── ♻️ app.component.html
│   ├── 📦 app.component.scss
│   ├── 📦 app.component.spec.ts
│   ├── ♻️ app.component.ts             # squelette : <router-outlet> + chargement initial des données
│   ├── ♻️ app.module.ts                # déclarations + httpClient (Va déclarer le HeaderComponent)
│   │
│   ├── ✨ core/                        # logique métier, sans UI
│   │   ├── models/
│   │   │   ├── olympic.ts              # interface Olympic
│   │   │   ├── participation.ts        # interface Participation
│   │   │   └── stat-item.ts            # interface StatItem (indicateur libellé/valeur)
│   │   ├── services/
│   │   │   └── olympic.service.ts      # le DataService : accès centralisé aux données
│   │   └── constants/
│   │       └── chart-colors.ts         # palette de couleur factorisée
│   │
│   ├── ✨ components/                  # composants réutilisables (UI pure)
│   │   └── header/                     # titre + KPIs
│   │       ├── header.component.html
│   │       ├── header.component.scss
│   │       └── header.component.ts
│   │
│   └── pages/                          # composants routés (un par écran)
│       ├── ♻️ country/                 # détail pays (line chart, vidé de sa logique HTTP et CSS dupliqué)
│       │   ├── country.component.html
│       │   ├── country.component.scss
│       │   ├── country.component.spec.ts
│       │   └── country.component.ts
│       │
│       ├── ♻️ home/                    # dashboard d'accueil (pie chart, utilisera le Header et le Service)
│       │   ├── home.component.html
│       │   ├── home.component.scss
│       │   ├── home.component.spec.ts
│       │   └── home.component.ts
│       │
│       └── 📦 not-found/                  # page d'erreur
│           ├── not-found.component.html
│           ├── not-found.component.scss
│           ├── not-found.component.spec.ts
│           └── not-found.component.ts
│
├── 📦 assets/
│   ├── .gitkeep
│   ├── images/
│   │   └── teleSport.png
│   └── mock/
│       └── olympic.json                # base de données
│
└── 📦 environments/
    ├── environment.prod.ts
    └── environment.ts
```
