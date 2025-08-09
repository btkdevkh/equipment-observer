# Weeplow Neptune - Suivi de votre système de filtration d'eau par gravité

![Weeplow Neptune mobile](https://github.com/btkdevkh/weeplow-gravity-suivi/blob/main/public/app-screenshot.png?raw=true)
![Weeplow Neptune tablet](https://github.com/btkdevkh/weeplow-gravity-suivi/blob/main/public/app-fullscreen.png?raw=true)

---

## Info

Cette application n'est pas liée à une base de données ou quoi que ce soit, elle se base sur les modules natifs de Node.js (fs) pour la persistance des données. Si vous voulez que les données soient persistées du coté serverless, il faudra une base de données quelque part.

Elle peut être utilisée sur un vieil ordinateur et afficher l'application en plein écran dans un environnement local en Node.js.

## Description

Cette application permet de suivre en temps réel l'état de votre système de filtration d'eau par gravité. Elle fournit des informations détaillées sur la consommation d'eau, la capacité restante, ainsi que les dates importantes liées à l'entretien du système.

---

## L'utilisation

Pour utiliser cette application, il suffit d'avoir `Node.js` installé sur votre machine et créer un fichier `data.json` à la raçine du projet avec cette structure : `{ "id": null }`.

## Fonctionnalités principales

- **Ajout de votre système de filtration d'eau à l'application** : Ajouter votre système de filtration d'eau à l'application dès l'acquisition pour le suivi et l'entretien.
- **Suivi de la consommation d'eau** : Visualisez la quantité d'eau déjà consommée en litres, avec possibilité d'ajouter des volumes consommés via l'interface.
- **Capacité maximale et restante** : Connaissez la capacité maximale du système (exemple : 22000 litres) et la capacité restante disponible.
- **Gestion des dates d'entretien** :
  - Date d'acquisition et date de mise en service.
  - Dates prévues pour le changement des filtres.
  - Dates pour le nettoyage des filtres et des cuves.
  - Alerte du nombre de jours restants avant nettoyage des cuves.
- **État général du système** : Indication claire de l'état (ex. : Ok) pour une tranquillité d'esprit.
- **Interface utilisateur simple et intuitive** avec une présentation claire des données.

---

## Exemple d'utilisation

L'application affiche des informations telles que :

- Modèle du système
- Date d'acquisition
- Date de mise en service
- Capacité max
- Volume d'eau déjà consommé
- Capacité restante
- Dates d'entretien prévues pour les filtres et le nettoyage des cuves

---

## Technologies utilisées

- Interface web responsive (PWA, Next.js/Node.js, Tailwind)
- Gestion des données en temps réel pour le suivi des consommations et de l’entretien

---

## Contact / Support

Pour plus d'informations, visitez le site officiel : [weeplow.com](https://weeplow.com)
