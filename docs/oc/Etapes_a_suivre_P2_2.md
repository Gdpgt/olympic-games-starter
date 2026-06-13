Prêt à résoudre l’exercice ?**

![Barres titres](D%C3%A9finissez%20et%20d%C3%A9veloppez%20le%20front-end%20en%20utilisant%20du%20code%20Angular%20maintenable%20-%20OpenClassrooms_files/16951295813132_Barre%20titres.png)

Dans cet exercice, vous allez poursuivre votre travail sur le projet **TéléSport** en suivant les [spécifications fonctionnelles](https://course.oc-static.com/projects/4078_D%C3%A9finissez+et+d%C3%A9veloppez+le+front-end+en+utilisant+du+code+Angular+maintenable/Spe%CC%81cifications+-+Te%CC%81le%CC%81sport.pdf) déjà fournies par votre responsable, Jeannette.

Après avoir défini une architecture claire, vous êtes désormais chargé·e d’**implémenter l’interface complète**. Cette interface permettra aux utilisateurs de visualiser les médailles olympiques et d’interagir avec les données.

Votre objectif est de rendre l’application **fonctionnelle, responsive et maintenable** :

*   intégrer les **maquettes fournies des deux pages** en composants Angular : 
    

*   un **dashboard** affichant le nombre de médailles par pays ;
    
*   une **page détail** présentant les statistiques d’un pays sélectionné ;
    

*   assurer la qualité **de l’expérience utilisateur** :  
    

*   la **navigation** **fluide** entre les pages ;
    
*   la **responsivité** dans différents appareils ;
    

*   et gérer les **cas d’erreur** côté front**.**

Cet exercice est entièrement guidé.

Vous allez suivre des étapes ci-dessous.

### Étapes

### 

#### Étape 1 – Améliorez le dashboard existant

Vous commencez par construire le dashboard Angular fonctionnel à partir des maquettes dans les spécifications fournies, en utilisant les composants bien structurés que vous avez mis en place précédemment.

**Prérequis**

*   avoir mis en place l’architecture front-end dans l’exercice précédent
    
*   avoir lu à nouveau les spécifications techniques
    

**Résultat attendu**

*   Un dashboard responsive qui affiche correctement :
    

*   un texte introductif
    
*   un graphique intéractif avec les données prévues
    
*   une redirection vers la page détail lorsqu’on clique sur un pays
    

**Recommandations**

*   D’abord, améliorer un composant`Home`dans`pages/`.
    

*   Importez le`DataService`(que vous avez créé lors de l’exercice 1) pour récupérer la liste des pays avec leurs médailles.
    

*   Utilisez Chart.js pour afficher un pie chart simple.
    
*   Ajoutez un`(click)`sur les barres → navigation`/country/:id`.
    

*   Vérifiez que la navigation fonctionne bien pour un utilisateur.
    

*   Créer un composant réutilisable dans`components/` qui affiche : 
    

*   le titre de la page
    
*   les indicateurs/statistiques qui sont en tête de page.  
    Chaque indicateur/statistique a un libellé et une valeur. Vous pouvez faire une liste d’indicateurs/statistiques sur laquelle vous itérer pour afficher la liste des indicateurs / statistiques.
    

*   Réutilisez ce composant dans le composant`Home`dans`pages/`
    
*   Travaillez de manière modulaire.
    

**Points de vigilance**

*   Ne mettez pas de logique métier dans le template HTML
    
*   N'utilisez aucun`any`pour les types
    
*   Testez la lisibilité sur un appareil mobile pour vérifier la responsivité.
    
*   Gérez bien les observables (détruire le(s) observable(s) utilisés dans le composant) 
    

**Outils**

*   VS Code
    
*   Angular CLI
    
*   [Chart.js](http://chart.js/)
    

**Ressources**

*   Le cours [Débutez avec Angular](https://openclassrooms.com/fr/courses/7471261-debutez-avec-angular) – Partie 2 & Partie 3
    
*   Le cours [Utilisez des design patterns en JavaScript](https://openclassrooms.com/fr/courses/7133336-utilisez-des-design-patterns-en-javascript) – Partie 4
    

### 

#### Étape 2 – Améliorez la page détail et ajoutez la navigation entre les pages

Vous allez améliorer la page de détail d’un pays qui affiche les informations détaillées d’un pays et l’évolution de ses performances. Puis, vous allez assurer la navigation entre le dashboard principal et la page de détail, en utilisant le routing Angular.

**Prérequis**

*   avoir développé le dashboard principal
    
*   avoir identifié les données spécifiques à afficher par pays ou filtre
    

**Résultat attendu**

*   Une page de détail responsive qui affiche :
    

*   les infos clés pour un pays (participations, médailles, athlètes)
    
*   un graphique d’évolution pour le pays.
    

*   Une navigation fluide entre le dashboard et la page de détail via l’URL.
    

**Recommandations**

*   Comme avant, commencez par améliorer le composant`Country` dans`pages/`.
    
*   Utilisez`ActivatedRoute`pour récupérer l’ID et`DataService`pour extraire les données du pays.
    
*   Réutiliser le composant des indicateurs/statistiques développés précédemment.
    
*   Vérifiez la navigation entre les pages
    

*   Chaque clic sur le dashboard doit mener à une page cohérente avec la donnée attendue.
    
*   Ajoutez un bouton retour vers le dashboard.
    

*   Ajoutez la gestion d’erreurs côté utilisateur : URL inexistante, pays inexistant, données manquantes.
    

**Points de vigilance**

*   Testez que la gestion des erreurs fonctionne en tant qu’utilisateur.
    

*   Par ex., si on saisit un ID inexistant → redirection vers page d’erreur.
    

*   Ne dupliquez pas la logique de récupération des données
    

**Outils**

*   Angular Router
    
*   Navigateurs avec DevTools
    

**Ressources**

*   Le cours Débutez avec Angular
    

*   dans la Partie 3 les chapitres _Affichez des listes_ et _Ajoutez du style dynamique_
    
*   dans la partie 5, le chapitre _Passez en SPA avec le routing_
    

*   [Angular Router Guide](https://angular.io/guide/router)
    

### 

#### Étape 3 – Gérez les erreurs de navigation et d'affichage

Vous allez sécuriser votre application en gérant les erreurs côté utilisateur : mauvaise URL, pays inexistant, données manquantes.

**Prérequis**

*   avoir mis en place la navigation entre les pages
    
*   avoir simulé les données dans un service
    

**Résultat attendu**

*   Une page d’erreur s’affiche clairement en cas de problème de navigation ou de récupération de données.
    

**Recommandations**

*   Ajoutez une route générique`**`dans le module de routing. 
    
*   Créez un`NotFoundComponent`. 
    
*   Simulez une erreur de récupération dans le service pour tester vos cas limites.
    

**Points de vigilance**

*   N'affichez pas un écran vide
    
*   N'exposez pas de messages techniques (ex: “undefined is not a function”)
    

**Outils**

*   DevTools du navigateur
    
*   Angular Router + Services
    

**Ressources**

*   Le cours Débutez avec Angular – Partie 5, notamment les chapitres : 
    

*   _Passez d’une route à l’autre_
    
*   _Activez les routes avec ActivatedRoute_
    

*   Le cours Utilisez des design patterns en JavaScript – Partie 4, chapitre _Écoutez vos objets avec l’Observer Pattern_
    
*   [Angular Error Handling](https://angular.io/errors)
    

### 

#### Étape 4 – Finalisez l’application et documentez-la sur GitHub

Testez l’ensemble de votre application Angular et vérifiez la gestion des erreurs côté utilisateur. Assurez-vous que l’application :

*   respecte les maquettes – grosso modo, pas au pixel prêt
    
*   est responsive – elle fonctionne bien sur desktop et mobile
    
*   suit les bonnes pratiques.
    

Vous allez finaliser le projet en rédigeant un README clair sur GitHub.

**Prérequis**

*   avoir terminé toutes les fonctionnalités attendues
    
*   avoir validé le bon fonctionnement sur desktop et mobile
    

**Résultat attendu**

*   Un dépôt GitHub propre, public, contenant le code final, bien documenté.
    
*   Captures d’écran d’UI qui montre les pages du site, toutes zippées en un dossier.
    

*   ​​Elles doivent montrer les deux pages de l’application, sur desktop et mobile.
    

**Recommandations**

*   Vérifiez le bon fonctionnement de toute l’application : 
    

*   le dashboard affiche le graphique des médailles.
    
*   la page détail affiche les informations d’un pays
    
*   la navigation est fluide : la redirection correcte lors d’un clic 
    

*   Testez la responsivité (DevTools mobile).
    
*   Supprimez les fichiers inutiles et renommez les composants si nécessaire
    
*   Organisez votre`README.md`avec un sommaire, instructions de lancement, structure du projet et captures d’écran si possible.
    

**Points de vigilance**

*   Gardez en tête qu’il n’est pas demandé de respecter les maquettes au pixel pret.
    

*   Le but ici est le bon fonctionnement de l’interface avec la prise en main de Angular et Typescript.
    

*   Ne publiez pas un projet cassé ou non responsif.
    
*   Assurez-vous que le repo GitHub est bien nettoyé : 
    

*   Pas de code mort
    
*   Supprimez console.log et any.
    
*   Vérifiez l'historique des commits
    

*   N'oubliez pas d’indiquer les prérequis techniques (Node, Angular CLI, etc.)
    

**Outils**

*   Git & GitHub
    
*   VS Code
    
*   Markdown preview
    

**Ressources**

*   Le cours Débutez avec Angular – Partie 4, chapitre _Formatez les chiffres_
    
*   Le cours [Devenez un expert de Git & GitHub](https://openclassrooms.com/fr/courses/5671626-devenez-un-expert-de-git-et-github)
    
*   [Angular CLI Reference](https://angular.io/cli)
    

### 

#### Vérifiez votre travail et faites le point avec votre mentor

Pour vérifier que vous n’avez rien oublié dans la réalisation de votre exercice, téléchargez et complétez la [fiche d’autoévaluation](https://course.oc-static.com/projects/4078_D%C3%A9finissez+et+d%C3%A9veloppez+le+front-end+en+utilisant+du+code+Angular+maintenable/P2+FSJA+-+Fiche+d'auto-e%CC%81valuation.pdf).

Parlez-en avec votre mentor durant votre dernière session de mentorat.
