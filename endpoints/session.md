# API Session

Cette section de l'API LambdaTest permet de gérer les sessions de test individuelles, d'accéder aux informations de session, aux captures d'écran, aux vidéos et aux différents types de logs.

## Base URL

```
https://api.lambdatest.com/automation/api/v1
```

## Endpoints

### 1. Récupérer toutes les sessions

Récupère la liste de toutes les sessions.

**Endpoint :** `GET /sessions`

**Description :** Fetch list of all sessions

**Paramètres de requête :**

| Nom       | Type    | Description                                                                            | Requis |
|-----------|---------|----------------------------------------------------------------------------------------|--------|
| build_id  | string  | Pour filtrer les sessions par build spécifique                                         | Non    |
| offset    | integer | Définit le décalage pour la pagination                                                | Non    |
| limit     | integer | Nombre de sessions à récupérer                                                       | Non    |
| status    | string  | Filtre par statut de session (running, completed, error, etc.)                         | Non    |
| fromdate  | string  | Date de début pour la plage de filtrage (format YYYY-MM-DD)                           | Non    |
| todate    | string  | Date de fin pour la plage de filtrage (format YYYY-MM-DD)                             | Non    |
| sort      | string  | Ordre de tri ("asc.start_time", "desc.duration", etc.)                                | Non    |

**Exemple de réponse :**

```json
{
  "meta": {
    "limit": 10,
    "offset": 0,
    "total": 120
  },
  "data": [
    {
      "session_id": "session_123456",
      "build_id": "build_12345",
      "name": "Test Login Functionality",
      "status": "completed",
      "browser": "Chrome",
      "browser_version": "90.0",
      "os": "Windows",
      "os_version": "10",
      "resolution": "1920x1080",
      "start_timestamp": "2023-05-15T10:30:00Z",
      "end_timestamp": "2023-05-15T10:35:00Z",
      "duration": 300
    },
    // ... autres sessions
  ]
}
```

### 2. Récupérer les détails d'une session spécifique

Récupère les informations détaillées d'une session spécifique.

**Endpoint :** `GET /sessions/{session_id}`

**Description :** session specific information

**Paramètres de chemin :**

| Nom        | Type   | Description                       | Requis |
|------------|--------|-----------------------------------|--------|
| session_id | string | L'identifiant unique de la session | Oui    |

**Exemple de réponse :**

```json
{
  "data": {
    "session_id": "session_123456",
    "build_id": "build_12345",
    "name": "Test Login Functionality",
    "status": "completed",
    "browser": "Chrome",
    "browser_version": "90.0",
    "os": "Windows",
    "os_version": "10",
    "resolution": "1920x1080",
    "start_timestamp": "2023-05-15T10:30:00Z",
    "end_timestamp": "2023-05-15T10:35:00Z",
    "duration": 300,
    "video_url": "https://example.com/video/session_123456",
    "console_logs_url": "https://example.com/logs/console/session_123456",
    "network_logs_url": "https://example.com/logs/network/session_123456",
    "command_logs_url": "https://example.com/logs/command/session_123456",
    "selenium_logs_url": "https://example.com/logs/selenium/session_123456"
  }
}
```

### 3. Supprimer une session

Supprime une session spécifique.

**Endpoint :** `DELETE /sessions/{session_id}`

**Description :** Delete test session

**Paramètres de chemin :**

| Nom        | Type   | Description                       | Requis |
|------------|--------|-----------------------------------|--------|
| session_id | string | L'identifiant unique de la session | Oui    |

**Exemple de réponse :**

```json
{
  "success": true,
  "message": "Session deleted successfully"
}
```

### 4. Mettre à jour les détails d'une session

Met à jour les informations d'une session.

**Endpoint :** `PATCH /sessions/{session_id}`

**Description :** Update test session details.

**Paramètres de chemin :**

| Nom        | Type   | Description                       | Requis |
|------------|--------|-----------------------------------|--------|
| session_id | string | L'identifiant unique de la session | Oui    |

**Corps de la requête :**

```json
{
  "name": "Nouveau nom de session",
  "status": "completed",
  "remarks": "Test réussi avec quelques avertissements"
}
```

**Exemple de réponse :**

```json
{
  "success": true,
  "message": "Session updated successfully",
  "data": {
    "session_id": "session_123456",
    "name": "Nouveau nom de session",
    "status": "completed",
    "remarks": "Test réussi avec quelques avertissements"
  }
}
```

### 5. Arrêter une session

Arrête une session en cours d'exécution.

**Endpoint :** `PUT /sessions/{session_id}/stop`

**Description :** Stop session by sessionID

**Paramètres de chemin :**

| Nom        | Type   | Description                       | Requis |
|------------|--------|-----------------------------------|--------|
| session_id | string | L'identifiant unique de la session | Oui    |

**Exemple de réponse :**

```json
{
  "success": true,
  "message": "Session stopped successfully"
}
```

### 6. Récupérer les captures d'écran d'une session

Récupère toutes les captures d'écran étape par étape d'une session.

**Endpoint :** `GET /sessions/{session_id}/screenshots`

**Description :** To fetch all step by step screenshots

**Paramètres de chemin :**

| Nom        | Type   | Description                       | Requis |
|------------|--------|-----------------------------------|--------|
| session_id | string | L'identifiant unique de la session | Oui    |

**Exemple de réponse :**

```json
{
  "data": [
    {
      "id": "screenshot_1",
      "timestamp": "2023-05-15T10:30:10Z",
      "url": "https://example.com/screenshots/session_123456/1.png",
      "title": "Page d'accueil"
    },
    {
      "id": "screenshot_2",
      "timestamp": "2023-05-15T10:30:20Z",
      "url": "https://example.com/screenshots/session_123456/2.png",
      "title": "Page de connexion"
    },
    // ... autres captures d'écran
  ]
}
```

### 7. Récupérer la vidéo d'une session

Récupère la vidéo enregistrée d'une session de test.

**Endpoint :** `GET /sessions/{session_id}/video`

**Description :** Fetch recorded video of a test session id.

**Paramètres de chemin :**

| Nom        | Type   | Description                       | Requis |
|------------|--------|-----------------------------------|--------|
| session_id | string | L'identifiant unique de la session | Oui    |

**Exemple de réponse :**

```json
{
  "status": "success",
  "data": {
    "video_url": "https://example.com/videos/session_123456.mp4"
  }
}
```

### 8. Récupérer les logs de commande

Récupère les logs de commande d'une session de test.

**Endpoint :** `GET /sessions/{session_id}/log/command`

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
      "result": "success"
    },
    {
      "timestamp": "2023-05-15T10:30:07Z",
      "command": "click",
      "arguments": ["#login-button"],
      "result": "success"
    },
    // ... autres logs de commande
  ]
}
```

### 9. Récupérer les logs Selenium

Récupère les logs Selenium d'une session de test.

**Endpoint :** `GET /sessions/{session_id}/log/selenium`

**Description :** selenium log of a test session

**Paramètres de chemin :**

| Nom        | Type   | Description                       | Requis |
|------------|--------|-----------------------------------|--------|
| session_id | string | L'identifiant unique de la session | Oui    |

### 10. Récupérer les logs réseau

Récupère les logs réseau d'une session de test.

**Endpoint :** `GET /sessions/{session_id}/log/network`

**Description :** Network log of a test session

**Paramètres de chemin :**

| Nom        | Type   | Description                       | Requis |
|------------|--------|-----------------------------------|--------|
| session_id | string | L'identifiant unique de la session | Oui    |

### 11. Récupérer les logs de console

Récupère les logs de console d'une session de test.

**Endpoint :** `GET /sessions/{session_id}/log/console`

**Description :** console log of a test session

**Paramètres de chemin :**

| Nom        | Type   | Description                       | Requis |
|------------|--------|-----------------------------------|--------|
| session_id | string | L'identifiant unique de la session | Oui    |

### 12. Récupérer les logs réseau au format HAR

Récupère les logs réseau au format HAR d'une session de test.

**Endpoint :** `GET /sessions/{session_id}/log/network.har`

**Description :** Network har log of a test session

**Paramètres de chemin :**

| Nom        | Type   | Description                       | Requis |
|------------|--------|-----------------------------------|--------|
| session_id | string | L'identifiant unique de la session | Oui    |

### 13. Récupérer les logs complets au format HAR

Récupère les logs complets au format HAR d'une session de test.

**Endpoint :** `GET /sessions/{session_id}/log/full-har`

**Description :** Full har log of a test session

**Paramètres de chemin :**

| Nom        | Type   | Description                       | Requis |
|------------|--------|-----------------------------------|--------|
| session_id | string | L'identifiant unique de la session | Oui    |

### 14. Téléverser des logs de terminal

Téléverse des logs de terminal pour une session.

**Endpoint :** `POST /sessions/{session_id}/terminal-logs`

**Description :** Upload terminal logs to our lambda storage

**Paramètres de chemin :**

| Nom        | Type   | Description                       | Requis |
|------------|--------|-----------------------------------|--------|
| session_id | string | L'identifiant unique de la session | Oui    |

**Corps de la requête :**
Le corps de la requête doit contenir les logs de terminal à téléverser.

**Exemple de réponse :**

```json
{
  "success": true,
  "message": "Terminal logs uploaded successfully"
}
```

### 15. Téléverser des logs d'assertion

Téléverse des logs d'assertion pour une session.

**Endpoint :** `POST /sessions/{session_id}/exceptions`

**Description :** Upload assertion logs to our lambda storage

**Paramètres de chemin :**

| Nom        | Type   | Description                       | Requis |
|------------|--------|-----------------------------------|--------|
| session_id | string | L'identifiant unique de la session | Oui    |

**Corps de la requête :**
Le corps de la requête doit contenir les logs d'assertion à téléverser.

**Exemple de réponse :**

```json
{
  "success": true,
  "message": "Assertion logs uploaded successfully"
}
```

## Codes d'erreur

| Code | Description                                    |
|------|------------------------------------------------|
| 400  | Requête invalide ou paramètres manquants       |
| 401  | Authentification requise                       |
| 403  | Accès non autorisé à cette ressource           |
| 404  | Session non trouvée                            |
| 500  | Erreur interne du serveur                      |
