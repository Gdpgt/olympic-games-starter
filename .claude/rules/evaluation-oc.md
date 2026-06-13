# Critères d'acceptation OpenClassrooms (référence d'auto-évaluation)

Check-list issue des spécifications fonctionnelles et de la fiche d'autoévaluation.
Sert de **référence** pour vérifier le travail ; n'autorise pas à générer les
livrables à la place de l'apprenant.

- `ng serve` démarre sans erreur.
- `/` affiche un graphe (pie) fonctionnel des médailles par pays + KPIs.
- Clic sur un pays → navigation `/country/:id`.
- `/country/:id` affiche les KPIs (participations, médailles, athlètes) + le
  graphique d'évolution.
- ID / URL invalide → message d'erreur clair (non technique) ou redirection
  (`NotFoundComponent`, route `**`).
- Responsive vérifié sur desktop, tablette, mobile.
- `DataService` centralise toutes les données (zéro tableau en dur dans les composants).
- Interfaces TypeScript définies (`Olympic`, `Participation`) ; aucun `any`.
- Observables détruits ; pas de `console.log` résiduel ; code propre (nommage, pas
  de code mort).
- `README.md` documente installation / scripts / structure / décisions.
- `ARCHITECTURE.md` présent et compréhensible.
