# API LambdaTest - Index des Endpoints

Ce document fournit un index centralisé de tous les endpoints de l'API LambdaTest pour l'automation Selenium. Chaque section est liée à sa documentation détaillée correspondante.

## Base URL

```
https://api.lambdatest.com/automation/api/v1
```

## Catégories d'API

### 1. [Build](build.md)
Endpoints pour gérer les builds de test.

| Méthode | Endpoint                | Description                       |
|---------|-------------------------|-----------------------------------|
| GET     | /builds                 | Récupérer tous les builds         |
| GET     | /builds/{build_id}      | Récupérer un build spécifique     |
| DELETE  | /builds/{build_id}      | Supprimer un build                |
| PATCH   | /builds/{build_id}      | Mettre à jour un build            |
| PUT     | /build/stop             | Arrêter les tests d'un build      |

### 2. [Session](session.md)
Endpoints pour gérer les sessions de test.

| Méthode | Endpoint                                    | Description                               |
|---------|---------------------------------------------|-------------------------------------------|
| GET     | /sessions                                   | Récupérer toutes les sessions             |
| GET     | /sessions/{session_id}                      | Récupérer une session spécifique          |
| DELETE  | /sessions/{session_id}                      | Supprimer une session                     |
| PATCH   | /sessions/{session_id}                      | Mettre à jour une session                 |
| PUT     | /sessions/{session_id}/stop                 | Arrêter une session                       |
| GET     | /sessions/{session_id}/screenshots          | Récupérer les captures d'écran            |
| GET     | /sessions/{session_id}/video                | Récupérer la vidéo d'une session          |
| GET     | /sessions/{session_id}/log/command          | Récupérer les logs de commande            |
| GET     | /sessions/{session_id}/log/selenium         | Récupérer les logs Selenium               |
| GET     | /sessions/{session_id}/log/network          | Récupérer les logs réseau                 |
| GET     | /sessions/{session_id}/log/console          | Récupérer les logs de console             |
| GET     | /sessions/{session_id}/log/network.har      | Récupérer les logs réseau au format HAR   |
| GET     | /sessions/{session_id}/log/full-har         | Récupérer les logs complets au format HAR |
| POST    | /sessions/{session_id}/terminal-logs        | Téléverser des logs de terminal           |
| POST    | /sessions/{session_id}/exceptions           | Téléverser des logs d'assertion           |

### 3. [Session Logs (V2)](session-logs-v2.md)
Endpoints améliorés pour accéder aux logs des sessions.

| Méthode | Endpoint                                    | Description                                     |
|---------|---------------------------------------------|-------------------------------------------------|
| GET     | /sessions/{session_id}/v2/log/command       | Récupérer les logs de commande (V2)             |
| GET     | /sessions/{session_id}/v2/log/selenium      | Récupérer les logs Selenium/Appium (V2)         |
| GET     | /sessions/{session_id}/v2/log/network       | Récupérer les logs réseau (V2)                  |
| GET     | /sessions/{session_id}/v2/log/console       | Récupérer les logs de console/navigateur (V2)   |
| GET     | /sessions/{session_id}/v2/log/network.har   | Récupérer les logs réseau au format HAR (V2)    |
| GET     | /sessions/{session_id}/v2/log/full-har      | Récupérer les logs complets au format HAR (V2)  |

### 4. [Test](test.md)
Endpoints pour gérer les tests spécifiques.

| Méthode | Endpoint                          | Description                                |
|---------|-----------------------------------|--------------------------------------------|
| POST    | /tests/{test_id}/exceptions       | Télécharger des logs d'assertion pour un test |
| GET     | /test/{test_id}/video             | Récupérer la vidéo d'un test               |

### 5. [Tunnel](tunnel.md)
Endpoints pour gérer les tunnels LambdaTest.

| Méthode | Endpoint                | Description                     |
|---------|-------------------------|---------------------------------|
| GET     | /tunnels                | Récupérer tous les tunnels      |
| DELETE  | /tunnels/{tunnel_id}    | Arrêter un tunnel               |

### 6. [Platforms](platforms.md)
Endpoints pour récupérer des informations sur les plateformes disponibles.

| Méthode | Endpoint                | Description                           |
|---------|-------------------------|---------------------------------------|
| GET     | /platforms              | Récupérer les plateformes disponibles |

### 7. Prerun
Endpoints pour gérer les fichiers d'exécution préalable.

| Méthode | Endpoint                | Description                                           |
|---------|-------------------------|-------------------------------------------------------|
| GET     | /files                  | Récupérer tous les fichiers préalables                |
| POST    | /files                  | Téléverser un fichier exécutable préalable            |
| DELETE  | /files/delete           | Supprimer un fichier préalable                        |
| POST    | /files/validate         | Vérifier si le fichier est approuvé par LambdaTest    |
| PUT     | /files/download         | Télécharger un fichier exécutable préalable           |

### 8. User-files
Endpoints pour gérer les fichiers utilisateur.

| Méthode | Endpoint                | Description                               |
|---------|-------------------------|-------------------------------------------|
| GET     | /user-files             | Récupérer tous les fichiers utilisateur   |
| POST    | /user-files             | Téléverser des fichiers                   |
| DELETE  | /user-files/delete      | Supprimer des fichiers utilisateur        |
| PUT     | /user-files/download    | Télécharger un fichier utilisateur        |

### 9. Lighthouse
Endpoints pour accéder aux rapports de performance Lighthouse.

| Méthode | Endpoint                             | Description                                   |
|---------|--------------------------------------|-----------------------------------------------|
| GET     | /lighthouse/report/{session_id}      | Récupérer le rapport de performance Lighthouse |

### 10. Organisation
Endpoints pour obtenir des informations sur votre organisation.

| Méthode | Endpoint                | Description                               |
|---------|-------------------------|-------------------------------------------|
| GET     | /org/concurrency        | Obtenir la concurrence de l'organisation  |

### 11. Project
Endpoints pour gérer les projets.

| Méthode | Endpoint                | Description                               |
|---------|-------------------------|-------------------------------------------|
| GET     | /projects               | Récupérer la liste des projets            |
| POST    | /project                | Créer un projet                           |
| GET     | /project/{id}           | Récupérer les détails d'un projet         |
| PUT     | /project/{id}           | Mettre à jour un projet                   |

### 12. Extensions
Endpoints pour gérer les extensions.

| Méthode | Endpoint                      | Description                               |
|---------|-------------------------------|-------------------------------------------|
| GET     | /files/extensions             | Récupérer toutes les extensions           |
| POST    | /files/extensions             | Téléverser des extensions                 |
| DELETE  | /files/extensions/delete      | Supprimer une extension                   |

### 13. Resolution
Endpoints pour récupérer des informations sur les résolutions disponibles.

| Méthode | Endpoint                | Description                                |
|---------|-------------------------|--------------------------------------------|
| GET     | /resolutions            | Récupérer les résolutions des plateformes  |

### 14. Geolocation
Endpoints pour gérer les tests avec différentes localisations géographiques.

| Méthode | Endpoint                | Description                               |
|---------|-------------------------|-------------------------------------------|
| GET     | /geoLocation/ips        | Récupérer les IPs de géolocalisation      |

## Authentification

Tous les endpoints requièrent une authentification. Consultez la [vue d'ensemble de l'API](../API-Overview.md#authentification) pour plus d'informations sur l'authentification.
