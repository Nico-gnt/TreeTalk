Dossier de projet – TreeTalk (lien de l'app : http://54.206.168.223/)

## Introduction 

  Ce dossier de projet détaille le processus de conception, de développement et de lancement de TreeTalk, ainsi que les objectifs et les défis associés à la création d'une application mobile. Ce projet consiste en la conception et la réalisation d'une application mobile de réseau social qui vise à créer une communauté de partage d'idées et de pensées basée sur le texte et les tags. 
  
## Contexte 
  Contrairement à d'autres applications de réseaux sociaux qui mettent l'accent sur le partage de photos et d'images, TreeTalk sera conçu pour offrir une plateforme simple et directe pour les utilisateurs qui cherchent à exprimer des idées et à interagir avec des personnes partageant les mêmes idées et tags.
Notre entreprise RN², a choisi le nom TreeTalk pour l'application, en raison de sa signification symbolique : le mot "tree" (arbre en anglais) rappelle les racines qui représentent la connexion entre les personnes.

## Technologies employées
  En ce qui concerne les technologies utilisées, nous avons choisi d'utiliser React pour le développement du front-end, Node.js pour la partie back-end (documentation avec Swagger et test avec Jest). Ce choix s'est appuyé sur un projet que nous avons réalisé à l'aide de ces technologies : http://3.26.192.234/, ainsi que sur leur performance à réaliser ce projet. Pour la gestion de la base de données, si nécessaire, nous avons opté pour SQLite en raison de sa simplicité d'utilisation et de son efficacité pour les petites applications.
  
## Infrastructure 
  Pour l'infrastructure, nous utiliserons AWS ainsi qu'une instance EC2 avec Github pour l'automatisation.

## Design & Aspect du projet
  Pour cette partie, nous avons choisi comme couleurs : le vert, le noir, le gris ainsi que le blanc pour les textes.

Il y a 2 onglets :
-	Accueil, où nous retrouverons principalement les posts des utilisateurs. Il y aura aussi la possibilité de commenter sous un post ou de suivre la personne. L’utilisateur pourra également effectuer des recherches afin de retrouver une personne ou un tag. 
-	Profil, où l’utilisateur pourra retrouver certains détails comme le nombre de ses abonnés, abonnements ou le nombre de tags suivis. Il pourra aussi changer de nom et prénom à cet endroit.

Voici le lien du Figma pour en savoir plus sur le design voulu: https://www.figma.com/proto/nQ1evhJ7uJXPxqjPBVskDc/Untitled?node-id=2%3A198&scaling=contain&page-id=0%3A1&starting-point-node-id=2%3A198

Voici le lien du User Story Mapping : https://miro.com/app/board/uXjVMPa30cM=/

Voici le lien du Trello : https://trello.com/b/tP6Zod7v/projet-twitter-like

## Répartition des tâches

- Développeur front-end : Nico, Rémi
- Développeur back-end : Rémi, Nathan, Raimanu
- Gestion Infrastructure : Nathan, Raimanu
- Relation client : Nico


## Détail du travail réalisé

Lors de la réalisation de ce projet, nous avons passé à la fois du temps en cours de Gestion de Projet, mais également en dehors de ces heures de cours pour travailler sur le projet. Nous avons passé environ 3 - 4 heures en plus par semaine à y travailler. Nous en sommes arrivés pour l'instant au résultat actuel, le site possède un onglet Accueil permettant de voir les publications de tout le monde. Il y a une box pour la création de message, il est possible de mettre des tags. Également, nous pouvons filtrer les messages par du texte ou encore par des tags. Nous retrouvons aussi un onglet Profil permettant de se connecter et/ou de créer un compte. Nous avons mis en place la mise à jour automatique du code via un push.

![alt text](https://raw.githubusercontent.com/Nico-gnt/TreeTalk/main/20230503_175246.jpg)
