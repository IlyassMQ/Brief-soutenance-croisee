## Description du projet  
Ce projet consiste à développer une application Front-End permettant **d’ajouter, organiser et gérer des employés** à travers une interface graphique représentant les locaux d’un bâtiment.  
L’utilisateur peut assigner les employés à différentes zones selon leur rôle, consulter leur profil, et gérer dynamiquement leur état (ajout, déplacement, suppression).

L’application est **responsive**, fluide, moderne, et respecte des règles métier strictes liées aux rôles des employés.

---

## Objectifs généraux  
- Ajouter, déplacer et supprimer des employés depuis une interface visuelle.  
- Garantir le respect des règles d’accès selon les rôles.  
- Proposer une interface intuitive et responsive.  
- Centraliser la gestion du personnel et la visualisation spatiale.  
- Offrir une expérience moderne, animée et agréable à utiliser.

---

## User Stories  

###  Conception (UI/UX)
- Interface intuitive, fluide et cohérente.  
- Palette de couleurs réfléchie + icônes intuitives.  
- Versions Desktop & Mobile avec design moderne (Flexbox, Grid, arrondis, boutons colorés).  

### Front-End
- Structure HTML complète avec sidebar affichant les employés non assignés + bouton **Add New Worker**.  
- Modale d’ajout avec champs :  
  **Nom, Rôle, Photo URL, Email, Téléphone, Expériences dynamiques.**  
- Prévisualisation de photo.  
- Affichage du plan du bâtiment avec 6 zones :  
  1. Salle de conférence  
  2. Réception  
  3. Salle des serveurs  
  4. Salle de sécurité  
  5. Salle du personnel  
  6. Salle d’archives  
- Règles d’accès :  
  - Réception → Réceptionnistes uniquement  
  - Salle des serveurs → Techniciens IT  
  - Salle de sécurité → Agents de sécurité  
  - Manager → partout  
  - Nettoyage → partout sauf Archives  
  - Autres → accès libre sauf zones restreintes  
- Bouton “X” pour retirer un employé d’une zone → retourne dans “Unassigned”.  
- Prévisualisation détaillée d’un employé (photo, infos, localisation, expériences).  
- Bouton “+” dans chaque zone pour choisir un employé éligible.  
- Zones obligatoires vides → affichées en rouge pâle (sauf Conférence & Personnel).  
- Limitation du nombre d’employés par zone.  
- Interface entièrement responsive + animations CSS.  
- Validation W3C (HTML/CSS).  
- Publication sur GitHub Pages / Vercel.

### Scrum Master
- Planification du projet sur Trello / Jira / GitHub Projects.  
- Gestion des branches Git (optionnel).  
- Présentation & démonstration du projet final.

---

## Tailles d’écrans prises en charge  

### Portrait
- >1280px : Grand écran PC  
- 1024–1279px : Petit écran PC  
- 768–1023px : Tablette  
- <767px : Mobile  

### Paysage
- 768–1023px : Mobile  
- 1024–1279px : Tablette  

---

## Bonus (Optionnel)
- Drag & Drop entre zones et “Unassigned”.  
- Bouton “Edit” dans la liste des employés non assignés.  
- Recherche + filtre par nom/rôle.  
- Sauvegarde automatique dans le localStorage.  
- Mode “Réorganisation automatique” avec placement intelligent.  
- Photo par défaut si aucune image n’est fournie.

---

## Technologies utilisées  
- **HTML5**  
- **CSS3 (Flexbox, Grid, animations)**
- **Tailwind CSS** 
- **JavaScript ES6+**  
- **LocalStorage**  
- **UI Design moderne** 
