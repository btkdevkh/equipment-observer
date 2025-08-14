# Suivi de votre système / appareil pour prolonger sa durée de vie

![System Tracker Home](https://github.com/btkdevkh/weeplow-gravity-suivi/blob/main/public/app-home.png?raw=true)
![System Tracker Create](https://github.com/btkdevkh/weeplow-gravity-suivi/blob/main/public/app_create.png?raw=true)

---

## Description

Cette application permet de suivre en temps réel l'état de votre système ou appareil. Elle fournit des informations détaillées, les dates importantes liées à l'entretien du système.

Cette application n'est pas liée à une base de données ou quoi que ce soit, elle se base sur les modules natifs de Node.js (fs) pour la persistance des données. Si vous voulez que les données soient persistées du coté serverless, il faudra une base de données quelque part.

Elle peut être utilisée sur un vieil ordinateur et afficher l'application en plein écran dans un environnement local en Node.js.

---

## L'utilisation

Pour utiliser cette application :

- Il suffit d'avoir `Node.js` installé sur votre machine.
- Installer les dépendances via `npm i`
- Créer un fichier `data.json` à la raçine du projet avec cette structure : `{ "equipments": [] }`. (facultative)

## Fonctionnalités principales

- **Ajout de votre système / appareil à l'application** : Ajouter votre système / appareil à l'application dès l'acquisition pour le suivi et l'entretien.
- **Suivi de la consommation d'eau** : Visualisez la quantité d'eau déjà consommée en litres, avec possibilité d'ajouter des volumes consommés via l'interface. (pour le système filtration d'eau)
- **Capacité maximale et restante** : Connaissez la capacité maximale du système (exemple : 22000 litres) et la capacité restante disponible. (pour le système filtration d'eau)
- **Gestion des dates d'entretien** :
  - Date d'acquisition et date de mise en service.
  - Dates prévues pour le changement des filtres. (pour le système filtration d'eau)
  - Dates pour le nettoyage des filtres et des cuves. (pour le système filtration d'eau)
  - Alerte du nombre de jours restants avant nettoyage des cuves. (pour le système filtration d'eau)
  - Autres alertes sur les dates pour les entretiens.
  - Autres dates de d'entretien en fonction du type de l'appareil.
- **État général du système** : Indication claire de l'état (ex. : Smiley) pour une tranquillité d'esprit.
- **Interface utilisateur simple et intuitive** avec une présentation claire des données.

---

## Exemple d'utilisation

L'application affiche des informations telles que :

- Modèle de l'appareil
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
