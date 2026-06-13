---
paths:
  - "src/**/*.{ts,html,scss}"
---

# Conventions Angular

- **Typage strict** : aucun `any`. Les données sont typées par les interfaces de
  `models/` (`Olympic`, `Participation`).
- **Accès aux données via service uniquement** : aucun appel HTTP ni tableau de
  données en dur dans un composant. Le `DataService` (`providedIn: 'root'`)
  centralise tout ; les composants l'injectent.
- **Templates sans logique métier** : la logique vit dans le composant/service, pas
  dans le HTML. Pas de `console.log` laissé en place.
- **Observables** : désinscription systématique (`takeUntil` + `DestroyRef`, ou
  `async` pipe). Pas de `subscribe` imbriqués.
- **Scaffolding** : générer composants/services avec `ng generate` (`ng g component`,
  `ng g service`).
- **Après refactor** : vérifier les `selector` des composants et mettre à jour les
  déclarations/imports dans `app.module.ts`.
- **Responsive & a11y** : conserver le responsive (desktop/tablette/mobile),
  contrastes AA, focus visibles, `aria-label` sur boutons/icônes.
