Exercice - Réfactorisez l'architecture front-end existante
----------------------------------------------------------

##### [#](#27052026-journal-de-lia)**⭐️** **27/05/2026 : Journal de l’IA ⭐️**

Nous mettons à votre disposition un **[Journal de l’IA](https://www.notion.so/openclassrooms/Journal-de-l-IA-projet-par-projet-366484f1fa6180e7a489ddae130bd4b3)** que vous pouvez dupliquer et personnaliser avec un compte Notion gratuit.  
Il vous servira à documenter vos usages de l’IA projet par projet : ce que vous avez demandé, ce que l’outil a produit, ce que vous en avez fait, et comment vous l’avez vérifié.  
L’objectif : utiliser l’IA de façon réfléchie et garder une trace claire de votre démarche, pour vous et pour votre mentor / évaluateur.  
Nous aimerions beaucoup vos retours pour améliorer ce modèle : vous pouvez compléter **[ce questionnaire](https://www.notion.so/openclassrooms/366484f1fa6180d29eb5f93d93589361)****.**

##### [#](#obtenez-le-github-student-developer-pack-avec-votre-statut-etudiant)Obtenez le **GitHub Student Developer Pack** avec votre statut étudiant

Le **GitHub Student Developer Pack** vous permet d’accéder gratuitement à des outils professionnels utilisés par les développeurs (**GitHub Copilot**, hébergement de projets, noms de domaine, outils de test, etc.), normalement payants.

Il vous aide à apprendre à coder et à travailler dans des conditions proches du monde professionnel, tout en facilitant la gestion et le partage de vos projets.  
Pour l’obtenir,

*   rendez-vous sur **[https://education.github.com/pack](https://education.github.com/pack)**,
*   cliquez sur “Sign up for Student Developer Pack”,
*   connectez-vous ou créez un compte GitHub si vous n'en avez pas encore,
*   cliquez, sur la nouvelle page ouverte sur "Start an application",
*   faites la demande avec l'adresse mail que vous utilisez sur Github et votre compte OpenClassrooms,
*   pour trouver et télécharger votre certificat de scolarité, suivez cette [vidéo explicative](https://course.oc-static.com/projects/Certificat+de+scolarit%C3%A9/Certificat+de+scolarite%CC%81+FR.mp4).

Après validation par GitHub (quelques minutes en général), l’accès est 100 % gratuit.

#### [#](#pret-a-resoudre-lexercice)**![](D%C3%A9finissez%20et%20d%C3%A9veloppez%20le%20front-end%20en%20utilisant%20du%20code%20Angular%20maintenable%20-%20OpenClassrooms_files/16968382727551_Section%20exercice.png)  
  
Prêt à résoudre l’exercice ?**

![Barres titres](D%C3%A9finissez%20et%20d%C3%A9veloppez%20le%20front-end%20en%20utilisant%20du%20code%20Angular%20maintenable%20-%20OpenClassrooms_files/16951295813132_Barre%20titres.png)

  
Dans cet exercice, vous plongerez dans un projet Angular d’entreprise à travers une application web en cours de développement pour **TéléSport**, une chaîne de télévision nationale.

TéléSport souhaite publier une page dédiée à l’historique des Jeux Olympiques, avec un tableau interactif affichant les performances des pays.

Mais [le code de départ](https://github.com/OpenClassrooms-Student-Center/D-finissez-et-d-veloppez-le-front-end-en-utilisant-du-code-Angular-maintenable) est **mal structuré**, difficile à maintenir et loin des standards professionnels. C’est ici que vous intervenez !

Votre responsable Jeannette vous donnez les [spécifications fonctionnelles](https://course.oc-static.com/projects/4078_D%C3%A9finissez+et+d%C3%A9veloppez+le+front-end+en+utilisant+du+code+Angular+maintenable/Spe%CC%81cifications+-+Te%CC%81le%CC%81sport.pdf) pour améliorer le code actuel.

En somme, votre mission consiste à :

*   **analyser le starter code existant** ;
    
*   **identifier les problèmes techniques et structurels** ;
    
*   et **concevoir une architecture front-end claire, modulaire et scalable**, prête à accueillir les développements de l’interface dans le prochain exercice.
    

Si vous avez besoin de remettre à niveau en Git et GitHub, vous pouvez suivre le cours OpenClassrooms [Devenez un expert de Git et GitHub](https://openclassrooms.com/fr/courses/7688581-devenez-un-expert-de-git-et-github).

Si vous avez déjà ce niveau d'expérience en Git + GitHub, vous pouvez le laisser.

Cet exercice est entièrement guidé.

Vous allez suivre des étapes ci-dessous.

### Étapes

### 

#### Étape 1 – ​​Analysez le code existant et repérez les problèmes

Vous allez explorer le starter code fourni et repérer les mauvaises pratiques Angular, les risques de dette technique et les violations de lisibilité. Cette étape est cruciale pour comprendre ce qui doit être amélioré dans le projet.

**Prérequis** 

Avoir : 

*   lu et compris la demande de Jeannette (votre manager chez TéléSport).
    
*   cloné et ouvert le starter code dans votre environnement de travail.
    
*   lancé l’application avec`ng serve`pour confirmer qu’elle démarre.
    

**Résultat attendu** 

*   Une liste structurée des problèmes identifiés, accompagnée de commentaires personnels, sauvegardée dans un fichier[`notes-architecture.md`](http://notes-architecture.md/)
    

**Recommandations**

*   D’abord, lancez l’application (`ng serve`) et explorez son rendu.
    
*   Prenez le temps d’ouvrir chaque fichier et de repérer les éléments confus ou problématiques. Ouvrez`src/app`et repérez :
    

*   des fichiers trop volumineux,
    
*   du code dupliqué ou obsolète,
    
*   des appels HTTP dans les composants,
    
*   l’absence de typage strict (`any`),
    
*   les bouts de code à supprimer (`console.log`  par exemple)
    
*   la mauvaise gestion des observables
    

*   Vérifiez si des **données sont gérées directement dans un composant** → notez-le comme anti-pattern.
    
*   Repérez des fichiers mal placés (ex. un service dans`components`).
    
*   Rédigez vos observations dans un fichier`notes-architecture.md`.
    

*   Ce fichier sera un sous-livrable inclut dans votre répository GitHub
    

**Points de vigilance**

*   Même si ici les données proviennent d’un tableau statique, rappelez-vous que dans un vrai projet, elles viendraient d’une API back-end.
    

*   Vous préparez donc déjà le terrain pour faire du code front-end qui va interagir avec une API aux projets suivants.
    

*   Ne modifiez pas encore le code à cette étape.
    
*   N’arrêtez-vous pas seulement à la structure des fichiers : regardez aussi le contenu logique.
    
*   Vérifiez le comportement visuel (même si c’est encore simple).
    

**Outils**

*   VS Code
    
*   Angular CLI (`ng serve`,`ng lint`)
    
*   Bloc-notes ou Markdown (pour le fichier`notes-architecture.md`)
    

**Ressources**

*   Dans le cours Utilisez des design patterns en JavaScript, le chapitre [Initiez-vous aux design patterns](https://openclassrooms.com/fr/courses/7133336-utilisez-des-design-patterns-en-javascript/7477341-initiez-vous-aux-design-patterns) dans la partie 1.
    
*   Dans le cours Débutez avec Angular : 
    

*   le chapitre [_Construisez une application Angular avec le CLI_](https://openclassrooms.com/fr/courses/7471261-debutez-avec-angular/7549436-construisez-une-application-angular-avec-le-cli) dans la partie 1.
    
*   le chapitre [_Construisez votre premier component_](https://openclassrooms.com/fr/courses/7471261-debutez-avec-angular/7549291-construisez-votre-premier-component) dans la partie 2.
    

*   [Angular Style Guide](https://angular.io/guide/styleguide)
    

### 

#### Étape 2 –​ Concevez une nouvelle architecture adaptée

Vous allez proposer une organisation plus claire et évolutive du code, en vous basant sur des principes de design patterns. Vous réorganisez la structure de dossiers et de fichiers de l’application pour respecter une architecture Angular claire.

Cette architecture guidera toutes vos prochaines implémentations.

**Prérequis**

Avoir : 

*   exploré et analysé le starter code
    
*   dressé la liste des problèmes identifiés dans`notes-architecture.md`.
    

**Résultat attendu**

*   Un schéma simple ou même une liste décrivant la nouvelle structure du front-end, accompagné d’explications dans`notes-architecture.md`.
    

**Recommandations**

*   Démarrez par identifier les blocs logiques et par créer un plan de composants, services et fichiers de types  `model`, `page`, etc.
    
*   Puis proposez une arborescence comme ci-dessous :
    

src/app/  
  ├── components/  ├── pages/  ├── services/    ├── models/  

*   Déplacez virtuellement (c’est-à-dire, dans vos notes) les fichiers vers la bonne catégorie.
    
*   Choisissez les patterns adaptés à votre besoin (Singleton pour les services, séparation component/service, etc.) et indiquez comment cela va améliorer le projet.
    

*   Notez comment cette organisation faciliterait l’intégration future d’un back-end (les services deviennent des points de contact avec l’API).
    

*   Ajoutez ce schéma dans votre fichier`notes-architecture.md`.
    

**Points de vigilance**

*   Prévoyez que tous les accès aux données passent par un dossier`services/`.
    

*   Dans ce projet, les réponses du backend seront mockées dans des fichiers JSON, mais dans les prochains projets, ce sera une **API REST réelle**.
    

*   Ne refactorisez pas encore le code : contentez-vous de préparer la nouvelle structure.
    
*   Évitez de sur-complexifier la structure ou de multiplier inutilement les sous-dossiers : la clarté prime.
    
*   Ne copiez pas une architecture sans lien avec le projet.
    

**Outils**

*   Outils de schéma, comme draw.io, Whimsical, Figma
    
*   VS Code
    

**Ressources**

*   Dans le cours Utilisez des design patterns en JavaScript, le chapitre [_Gérez vos connexions avec le Singleton Pattern_](https://openclassrooms.com/fr/courses/7133336-utilisez-des-design-patterns-en-javascript/7478448-gerez-vos-connexions-avec-le-singleton-pattern) dans la partie 2.
    
*   Le cours Débutez avec Angular, dans la Partie 5 : 
    

*   le chapitre [_Partagez des données avec les Services_](https://openclassrooms.com/fr/courses/7471261-debutez-avec-angular/7549401-partagez-des-donnees-avec-les-services)
    
*   le chapitre [_Passez en SPA avec le routing_](https://openclassrooms.com/fr/courses/7471261-debutez-avec-angular/7549406-passez-en-spa-avec-le-routing)
    

*   [Angular Services Guide](https://angular.io/guide/architecture-services)
    

### 

#### Étape 3 – Refactorez les composants existants en appliquant l’architecture

Vous allez restructurer le projet en suivant votre plan. Vous appliquerez l’architecture définie lors de l’étape précédente en créant les bons composants, en séparant les responsabilités, et en typant correctement les données.

**Prérequis**

Avoir :

*   conçu votre nouvelle structure d’architecture (et la valider si vous avez des doutes)
    
*   identifié les composants et services à créer ou modifier
    

**Résultat attendu**

*   Une nouvelle base Angular propre et modulaire, avec des composants spécialisés, chacun dans son fichier dédié, compilable et prête pour les développements.
    

**Recommandations**

*   Commencez par identifier un gros composant dans le starter code.
    

*   Découpez-le en composants enfants (par exemple :`MedalChartComponent`,`CountryCardComponent`).
    

*   Refactoriser le reste du code :
    

*   Déplacez les fichiers dans les bons dossiers (`components/`ou`pages/`).
    
*   Déplacez les appels API dans un service,
    
*   Utilisez les outils Angular CLI pour générer les fichiers (`ng generate`). 
    
*   Créez des interfaces pour typer les données, 
    
*   Nettoyez les composants. 
    

*   Testez au fur et à mesure avec`ng serve`pour vérifier que l’application compile après vos changements.
    
*   Ajoutez un commit Git clair :`_Refactor: séparation des composants_.`
    

**Points de vigilance**

*   Vérifiez le`selector`des composants enfants après refactor.
    
*   Mettez à jour les imports dans`app.module.ts`.
    
*   Ne laissez pas de code orphelin (`console.log`, variables inutilisées).
    
*   Ne supprimez ni renommez les fichiers sans mettre à jour les imports
    
*   Typez votre code (aucun`any`ne doit subsister)
    
*   Gardez en tête pour le futur l’importance de découper les composants : ceci permettra d’afficher des données venues d’un **back-end**, sans que tout repose sur un seul fichier.
    

**Outils**

*   Angular CLI (`ng g component`,`ng g service`,`ng lint`,`ng serve`)
    
*   VS Code
    
*   Git et GitHub
    

**Ressources**

*   Dans le cours Utilisez des design patterns en JavaScript, le chapitre [_Intégrez une nouvelle fonctionnalité à un objet existant avec le Decorator Pattern_](https://openclassrooms.com/fr/courses/7133336-utilisez-des-design-patterns-en-javascript/7478460-integrez-une-nouvelle-fonctionnalite-a-un-objet-existant-avec-le-decorator-pattern) dans la partie 3.
    
*   Dans le cours Débutez avec Angular, partie 2 : 
    

*   le chapitre [_Construisez votre premier component_](https://openclassrooms.com/fr/courses/7471261-debutez-avec-angular/7549291-construisez-votre-premier-component)
    
*   le chapitre _Ajoutez des propriétés personnalisées_
    

*   [Angular CLI Reference](https://angular.io/cli)
    

### 

#### Étape 4 – Externalisez la gestion des données dans un service Angular

Déplacez la logique de données (tableaux, JSON) des composants vers un service Angular.

**Prérequis**Avoir :

*   refactoré les composants
    
*   identifié où les données étaient codées en dur.
    

**Résultat attendu**

*   Un`DataService`unique gérant les données, injecté dans les composants.
    

**Recommandations pas à pas**

*   D’abord, créez un service avec Angular CLI :`ng generate service services/data`.
    
*   Déplacez-y le tableau statique des pays/médailles.
    
*   Importez et injectez ce service dans vos composants via le constructeur.
    
*   Testez que l’application fonctionne toujours.
    

*   Pour ce projet, il s’agit de tests faits à la main ; aucun test automatisé n’est attendu.
    

*   Committez avec un message clair, comme _`Refactor: centralisation des données dans DataService`_`.`
    

**Points de vigilance**

*   Ne laissez aucun tableau en dur dans les composants.
    
*   Vérifiez que le service est bien déclaré en`providedIn: 'root'`.
    
*   Testez l’affichage du dashboard et de la page détail.
    
*   Même si dans ce projet, votre`DataService`retourne un tableau statique, mais dans des projets futurs, il pointera vers une **API REST** pour récupérer des données réelles.
    

**Outils**

*   Angular CLI
    
*   VS Code
    
*   Git et GitHub
    

**Ressources**

*   Dans le cours Utilisez des design patterns en JavaScript, la partie 2, le chapitre [_Gérez vos connexions avec le Singleton Pattern_](https://openclassrooms.com/fr/courses/7133336-utilisez-des-design-patterns-en-javascript/7478448-gerez-vos-connexions-avec-le-singleton-pattern)
    
*   Dans le cours Débutez avec Angular, Partie 5, le chapitre [_Partagez des données avec les Services_](https://openclassrooms.com/fr/courses/7471261-debutez-avec-angular/7549401-partagez-des-donnees-avec-les-services)
    

### 

#### Étape 5 – Documentez l’architecture et validez-la

Rédigez une documentation simple de votre nouvelle architecture front-end.

Si vous n’êtes pas assez confiant, validez-la avec votre mentor avant de passer à l’implémentation UI lors de l’exercice prochain.

**Prérequis**Avoir :

*   externalisé les données dans un service ;
    
*   testé à la main l’application refactorée.
    

**Résultat attendu**

*   Un fichier`ARCHITECTURE.md`décrivant la structure, les composants, et l’usage du service.
    

**Recommandations pas à pas**

*   Dans`ARCHITECTURE.md`, décrivez :
    

*   l’arborescence des dossiers ;
    
*   les composants et leurs rôles ;
    
*   le service Angular et son rôle.
    

*   Vous pouvez utiliser vos notes dans le fichier`notes-architecture.md`pour servir comme base de texte du fichier `ARCHITECTURE.md`.
    
*   Mentionnez comment cette architecture prépare à une future connexion back-end/API.
    
*   Relisez-vous : si un nouveau développeur arrive, doit-il comprendre votre projet ?
    
*   Committez votre fichier.
    

**Points de vigilance**

*   Ne recopiez pas tout le code : restez synthétique.
    
*   Vérifiez la cohérence entre vos notes, votre code, et la documentation.
    

**Outils**

*   VS Code (Markdown)
    
*   Git & GitHub
    

**Ressources**

*   Dans le cours Utilisez des design patterns en JavaScript, Partie 4, le chapitre [_Écoutez vos objets avec l’Observer Pattern_](https://openclassrooms.com/fr/courses/7133336-utilisez-des-design-patterns-en-javascript/7478472-ecoutez-vos-objets-avec-lobserver-pattern)
    
*   Dans le cours Débutez avec Angular, Partie 5, le chapitre [_Centralisez votre logique avec les Services_](https://openclassrooms.com/fr/courses/7471261-debutez-avec-angular/7567851-centralisez-votre-logique-avec-les-services)
    

### 

#### Vérifiez votre travail et faites le point avec votre mentor

Pour vérifier que vous n’avez rien oublié dans la réalisation de votre exercice, téléchargez et complétez la [fiche d’autoévaluation](https://course.oc-static.com/projects/4078_D%C3%A9finissez+et+d%C3%A9veloppez+le+front-end+en+utilisant+du+code+Angular+maintenable/P2+FSJA+-+Fiche+d'auto-e%CC%81valuation.pdf).

Parlez-en avec votre mentor durant votre dernière session de mentorat.
