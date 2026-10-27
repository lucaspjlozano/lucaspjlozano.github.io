# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Nature du projet

Site vitrine personnel de Lucas LOZANO, à donner aux recruteurs en plus du LinkedIn (premier usage : le champ « site internet » de la candidature Chanel Parfums Beauté, Pantin, réf. JOBREQ00118358). But : se démarquer des autres candidats au stage de BUT 2 Mesures Physiques (11 semaines dès le 12 avril 2027) en montrant, et pas seulement en disant, la rigueur de mesure du candidat. Tout le contenu est en français (une version anglaise éventuelle reste à décider).

Le dossier parent (`../`) est l'espace de recherche de stage ; son `CLAUDE.md` s'applique aussi ici.

## Sources de vérité pour le contenu

Le site ne contient **aucun fait absent** de ces fichiers (pas de compétence, chiffre, expérience ni technique inventés ; la DSC, la rhéologie et le Turbiscan ne sont jamais revendiqués) :
- `../Profil/profil_candidat.md` : faits validés par le candidat, y compris ce qu'il ne faut pas écrire.
- `../Profil/cv_base.json` : CV V5 de référence (formulations déjà auditées).
- `../Profil/cv_V1_original.json` : réservoir (sports, stage WTW…), à n'utiliser qu'avec l'accord du candidat.
- `../Profil/photo.png` : photo.
- Toujours « 11 semaines », jamais « 3 mois » ; formation « 2024 – 2027 », redoublement non mentionné ; BUT et non DUT.

Une nouvelle information donnée par le candidat pour le site va d'abord dans `../Profil/profil_candidat.md`, puis dans le site.

## Structure

Site statique sans build ni dépendance : `index.html` (contenu français), `styles.css`, `main.js`, `assets/` (photo `lucas.jpg`, `CV_LOZANO_Lucas.pdf` copié de `../CV/CV_LOZANO_Lucas_V5_optimisee.pdf`, `favicon.svg`). Police système Apple, Inter en secours (Google Fonts) ; palette gris + bordeaux définie en variables sur `:root`, redéfinie pour le mode sombre.

- **Bilingue** : le français est écrit dans le HTML ; chaque élément traduisible porte `data-i18n="clé"` et l'anglais est dans l'objet `EN` de `main.js`. Ajouter un texte = ajouter la clé dans les deux. Le choix de langue est gardé dans `localStorage`.
- **Calculateur GUM** (`#calculateur`) : moyenne, type A = s/√n, résolution = r/√12, étalon = U/2, U = k·u_c arrondi à 2 chiffres significatifs. Il alimente aussi la valeur u_c affichée sur la photo et le résultat de la chaîne de mesure. Les valeurs par défaut sont des exemples, pas les mesures réelles du candidat.
- **Parcours en récit** (`#parcours`) : chapitres `.chapter` (attributs `data-year`, `data-place`, `data-place-en`) ; une colonne collante affiche l'année et le lieu du chapitre actif (barre fine en haut sur mobile). Photos `assets/lycee.jpg`, `assets/telecom.jpg` et logo `assets/lazaristes.png` fournis par le candidat (basse résolution, tirées du web : à remplacer par ses propres photos si possible). Pour le lycée, aucun chiffre de classement : les sources divergent selon l'année.
- **Manifeste** (`[data-manifesto]`) : texte à la première personne découpé en mots qui s'allument au scroll ; à faire relire au candidat à chaque modification.
- **Chaîne de mesure** (`.chain`) : section épinglée (`position: sticky`, 340vh) pilotée par le scroll sur bureau ; sous 760 px elle devient une liste normale.
- Animations : apparitions `.reveal` (IntersectionObserver), règle graduée liée au scroll, compteurs, toutes coupées par `prefers-reduced-motion`.

## Commandes

`python3 -m http.server` échoue dans ce dossier (accès à `Documents` refusé à `getcwd`). L'aperçu passe par `../.claude/launch.json` (configuration `site`), qui lance `../.claude/serve.js`, un petit serveur Node statique sur le port 8765 ; utiliser `preview_start` puis ouvrir `http://localhost:8765`. Vérifier en 375 px (aucun défilement horizontal : `document.documentElement.scrollWidth === innerWidth`) et en bureau, en clair et en sombre, en français et en anglais.

## Mise en ligne

Le lien donné aux entreprises doit être public, stable et sans compte à créer pour le lecteur. Hébergement à choisir avec le candidat (GitHub Pages, Netlify ou Artifact claude.ai). Claude ne crée aucun compte et ne saisit aucun mot de passe : le candidat s'en charge. Toute publication se fait après son « oui » explicite.
