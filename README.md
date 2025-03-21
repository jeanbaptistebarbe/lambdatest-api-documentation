# Documentation LambdaTest

Ce dépôt contient une documentation détaillée des services LambdaTest, incluant l'API d'automatisation Selenium et l'outil KaneAI.

## Structure du repository

La documentation est organisée de la manière suivante :

- `README.md` : Ce fichier, contenant des informations générales sur le repository
- `API-Overview.md` : Vue d'ensemble de l'API
- `LambdaTest-API-Command-Guide.md` : Guide de référence rapide des commandes API
- `KaneAI-Documentation.md` : Documentation complète de KaneAI
- `KaneAI-Command-Guide.md` : Guide de référence des commandes KaneAI
- `quick-start.md` : Guide de démarrage rapide pour l'API
- Dossier `endpoints/` : Documentation détaillée de chaque endpoint API, organisée par catégorie
- Dossier `examples/` : Exemples de code pour l'utilisation de l'API

## API LambdaTest

L'API LambdaTest pour l'automation Selenium est documentée en détail dans ce repository. Elle est accessible à l'adresse suivante : https://api.lambdatest.com/automation/api/v1

### Catégories d'API

L'API LambdaTest pour l'automation Selenium est organisée en plusieurs catégories :

1. Build - Gestion des builds de test
2. Session - Gestion des sessions de test
3. Session Logs (V2) - Accès aux logs des sessions
4. Test - API liées aux tests spécifiques
5. Tunnel - Gestion des tunnels pour les tests locaux
6. Platforms - Récupération des plateformes disponibles
7. Prerun - Gestion des fichiers d'exécution préalable
8. User-files - Gestion des fichiers utilisateur
9. Lighthouse - Rapports de performance
10. Organisation - Informations sur l'organisation
11. Project - Gestion des projets
12. Extensions - Gestion des extensions
13. Resolution - Informations sur les résolutions disponibles
14. Geolocation - Gestion des localisations géographiques

Chaque section est documentée dans un fichier séparé avec tous les endpoints disponibles, leurs paramètres, et des exemples d'utilisation.

### Authentification

L'API LambdaTest utilise une authentification Basic Auth avec votre nom d'utilisateur et votre clé d'accès. Les détails d'authentification sont documentés dans chaque section d'endpoint.

## KaneAI

KaneAI est une solution d'automatisation de test basée sur l'IA développée par LambdaTest. Elle permet d'écrire des tests en langage naturel, sans nécessiter de compétences en programmation.

### Documentation KaneAI

La documentation complète de KaneAI est disponible dans les fichiers suivants :

- `KaneAI-Documentation.md` : Guide complet d'utilisation de KaneAI, incluant introduction, premiers pas, création de tests, fonctionnalités avancées, et exemples
- `KaneAI-Command-Guide.md` : Référence rapide des commandes disponibles dans KaneAI

### Caractéristiques principales de KaneAI

- Tests en langage naturel
- Pas de compétences en codage requises
- Interface intuitive
- Réduction du temps de maintenance des tests
- Intégration transparente avec LambdaTest

## Exemples de code

Le dossier `examples/` contient des exemples d'utilisation de l'API LambdaTest :

- `test-reporting.js` : Script JavaScript pour générer des rapports de test automatisés
- `automation_dashboard.py` : Dashboard Python pour surveiller les tests d'automatisation en temps réel

## Contributions

Ce repository est maintenu pour référence. Pour toute question concernant l'API ou KaneAI, veuillez vous référer à la documentation officielle de LambdaTest ou contacter leur support.
