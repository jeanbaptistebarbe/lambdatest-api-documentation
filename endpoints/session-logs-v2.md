# API Session Logs (V2)

Cette section de l'API LambdaTest offre des endpoints améliorés pour accéder aux différents types de logs des sessions de test.

## Base URL

```
https://api.lambdatest.com/automation/api/v1
```

## Endpoints

### 1. Récupérer les logs de commande (V2)

Récupère les logs de commande d'une session de test avec la nouvelle API V2.

**Endpoint :** `GET /sessions/{session_id}/v2/log/command`

**Description :** command logs of a test session

**Paramètres de chemin :**

| Nom        | Type   | Description                       | Requis |
|------------|--------|-----------------------------------|--------|
| session_id | string | L'identifiant unique de la session | Oui    |

**Exemple de réponse :**

```json
{
  "data": [
    {
      "timestamp": "2023-05-15T10:30:05Z",
      "command": "navigate",
      "arguments": ["https://example.com"],
      "result": "success",
      "duration": 1.5
    },
    {
      "timestamp": "2023-05-15T10:30:07Z",
      "command": "click",
      "arguments": ["#login-button"],
      "result": "success",
      "duration": 0.3
    },
    // ... autres logs de commande
  ]
}
```

### 2. Récupérer les logs Selenium/Appium (V2)

Récupère les logs Selenium ou Appium d'une session de test avec la nouvelle API V2.

**Endpoint :** `GET /sessions/{session_id}/v2/log/selenium`

**Description :** selenium/appium log of a test session

**Paramètres de chemin :**

| Nom        | Type   | Description                       | Requis |
|------------|--------|-----------------------------------|--------|
| session_id | string | L'identifiant unique de la session | Oui    |

**Exemple de réponse :**

```json
{
  "data": [
    {
      "timestamp": "2023-05-15T10:30:04Z",
      "level": "INFO",
      "message": "Initiating Chrome browser session"
    },
    {
      "timestamp": "2023-05-15T10:30:05Z",
      "level": "INFO",
      "message": "Chrome browser initiated successfully"
    },
    // ... autres logs selenium/appium
  ]
}
```

### 3. Récupérer les logs réseau (V2)

Récupère les logs réseau d'une session de test avec la nouvelle API V2.

**Endpoint :** `GET /sessions/{session_id}/v2/log/network`

**Description :** Network log of a test session

**Paramètres de chemin :**

| Nom        | Type   | Description                       | Requis |
|------------|--------|-----------------------------------|--------|
| session_id | string | L'identifiant unique de la session | Oui    |

**Exemple de réponse :**

```json
{
  "data": [
    {
      "timestamp": "2023-05-15T10:30:06Z",
      "url": "https://example.com",
      "method": "GET",
      "status": 200,
      "size": 1240,
      "type": "html",
      "duration": 0.45
    },
    {
      "timestamp": "2023-05-15T10:30:06Z",
      "url": "https://example.com/styles.css",
      "method": "GET",
      "status": 200,
      "size": 3540,
      "type": "css",
      "duration": 0.12
    },
    // ... autres logs réseau
  ]
}
```

### 4. Récupérer les logs de console/navigateur (V2)

Récupère les logs de console ou de navigateur d'une session de test avec la nouvelle API V2.

**Endpoint :** `GET /sessions/{session_id}/v2/log/console`

**Description :** console/browser log of a test session

**Paramètres de chemin :**

| Nom        | Type   | Description                       | Requis |
|------------|--------|-----------------------------------|--------|
| session_id | string | L'identifiant unique de la session | Oui    |

**Exemple de réponse :**

```json
{
  "data": [
    {
      "timestamp": "2023-05-15T10:30:07Z",
      "level": "INFO",
      "source": "console-api",
      "message": "Page loaded successfully"
    },
    {
      "timestamp": "2023-05-15T10:30:09Z",
      "level": "ERROR",
      "source": "javascript",
      "message": "Uncaught TypeError: Cannot read property 'value' of null",
      "location": "app.js:45"
    },
    // ... autres logs de console
  ]
}
```

### 5. Récupérer les logs réseau au format HAR (V2)

Récupère les logs réseau au format HAR d'une session de test avec la nouvelle API V2.

**Endpoint :** `GET /sessions/{session_id}/v2/log/network.har`

**Description :** Network har log of a test session

**Paramètres de chemin :**

| Nom        | Type   | Description                       | Requis |
|------------|--------|-----------------------------------|--------|
| session_id | string | L'identifiant unique de la session | Oui    |

**Exemple de réponse :**
La réponse est un fichier HAR (HTTP Archive) contenant des informations détaillées sur les requêtes et réponses HTTP.

### 6. Récupérer les logs complets au format HAR (V2)

Récupère les logs complets au format HAR d'une session de test avec la nouvelle API V2.

**Endpoint :** `GET /sessions/{session_id}/v2/log/full-har`

**Description :** Full har log of a test session

**Paramètres de chemin :**

| Nom        | Type   | Description                       | Requis |
|------------|--------|-----------------------------------|--------|
| session_id | string | L'identifiant unique de la session | Oui    |

**Exemple de réponse :**
La réponse est un fichier HAR (HTTP Archive) complet contenant des informations détaillées sur toutes les interactions HTTP durant la session.

## Améliorations de la V2

La version V2 des endpoints de logs offre plusieurs améliorations par rapport à la version originale :

1. **Performances améliorées** : Les réponses sont généralement plus rapides grâce à une optimisation du backend.
2. **Format de données enrichi** : Informations supplémentaires comme la durée précise des opérations, les niveaux de log, et des détails contextuels plus riches.
3. **Pagination** : Prise en charge de la pagination pour les sessions avec de grandes quantités de logs.
4. **Filtrage amélioré** : Possibilité de filtrer les logs par niveau, type, plage horaire, etc.
5. **Format standardisé** : Format de réponse plus cohérent entre les différents types de logs.

## Codes d'erreur

| Code | Description                                    |
|------|------------------------------------------------|
| 400  | Requête invalide ou paramètres manquants       |
| 401  | Authentification requise                       |
| 403  | Accès non autorisé à cette ressource           |
| 404  | Session ou logs non trouvés                    |
| 500  | Erreur interne du serveur                      |
