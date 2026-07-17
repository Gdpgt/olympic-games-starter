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
