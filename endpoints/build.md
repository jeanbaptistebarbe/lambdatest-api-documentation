# API Build

Cette section de l'API LambdaTest permet de gérer les builds de test, qui sont des regroupements logiques de sessions de test.

## Base URL

```
https://api.lambdatest.com/automation/api/v1
```

## Endpoints

### 1. Récupérer tous les builds

Récupère la liste de tous les builds associés à un compte.

**Endpoint :** `GET /builds`

**Description :** Fetch all builds of an account.

**Paramètres de requête :**

| Nom      | Type    | Description                                                                           | Requis |
|----------|---------|---------------------------------------------------------------------------------------|--------|
| offset   | integer | Définit le nombre de listes sur la base du paramètre limit. Ex: offset=10            | Non    |
| limit    | integer | Pour récupérer un nombre spécifié d'enregistrements. Ex: limit=10                     | Non    |
| status   | string  | Pour récupérer la liste des builds avec des statuts spécifiques. Vous pouvez passer plusieurs statuts séparés par des virgules. Ex: running,queued,completed,timeout,error | Non    |
| fromdate | string  | Pour récupérer la liste des builds exécutés à partir de la date de début spécifiée. Le format de date doit être YYYY-MM-DD. Ex: "2018-03-15" | Non |
| todate   | string  | Pour récupérer la liste des builds exécutés jusqu'à la date de fin spécifiée. Si les valeurs fromdate et todate sont fournies, cela fonctionne comme un filtre de plage. Le format de date doit être YYYY-MM-DD. Ex: "2018-03-15" | Non |
| sort     | string  | Pour trier la liste par ordre ascendant ou descendant en utilisant plusieurs clés. Ex: "asc.user_id,desc.org_id" | Non |

**Notes :** Vous pouvez limiter le nombre d'enregistrements et appliquer des filtres sur le statut, la plage de dates et trier par utilisateurs et date de début/fin en ordre asc et desc. Vous pouvez appliquer un tri sur plusieurs colonnes.

**Exemple de réponse :**

```json
{
  "meta": {
    "limit": 10,
    "offset": 0,
    "total": 110
  },
  "data": [
    {
      "user_id": "user_123",
      "username": "testuser",
      "build_id": "build_12345",
      "build_name": "Sample Build 1",
      "status_ind": "completed",
      "start_timestamp": "2023-05-15T10:30:00Z",
      "end_timestamp": "2023-05-15T11:00:00Z",
      "duration": 1800,
      "total_tests": 10,
      "passed_tests": 8,
      "failed_tests": 2
    },
    {
      "user_id": "user_123",
      "username": "testuser",
      "build_id": "build_12346",
      "build_name": "Sample Build 2",
      "status_ind": "running",
      "start_timestamp": "2023-05-16T09:30:00Z",
      "end_timestamp": null,
      "duration": null,
      "total_tests": 5,
      "passed_tests": 2,
      "failed_tests": 0
    }
    // ... autres builds
  ]
}
```

### 2. Récupérer un build spécifique

Récupère les détails d'un build spécifique.

**Endpoint :** `GET /builds/{build_id}`

**Description :** Fetch specified build details

**Paramètres de chemin :**

| Nom      | Type   | Description                        | Requis |
|----------|--------|------------------------------------|--------|
| build_id | string | L'identifiant unique du build      | Oui    |

**Exemple de réponse :**

```json
{
  "data": {
    "user_id": "user_123",
    "username": "testuser", 
    "build_id": "build_12345",
    "build_name": "Sample Build 1",
    "status_ind": "completed",
    "start_timestamp": "2023-05-15T10:30:00Z",
    "end_timestamp": "2023-05-15T11:00:00Z",
    "duration": 1800,
    "total_tests": 10,
    "passed_tests": 8,
    "failed_tests": 2,
    "sessions": [
      {
        "session_id": "session_001",
        "status": "completed",
        "name": "Test 1",
        "browser": "Chrome",
        "browser_version": "90.0",
        "os": "Windows",
        "os_version": "10",
        "duration": 180
      },
      // ... autres sessions
    ]
  }
}
```

### 3. Supprimer un build

Supprime un build spécifique.

**Endpoint :** `DELETE /builds/{build_id}`

**Description :** Delete Build

**Paramètres de chemin :**

| Nom      | Type   | Description                      | Requis |
|----------|--------|----------------------------------|--------|
| build_id | string | L'identifiant unique du build    | Oui    |

**Exemple de réponse :**

```json
{
  "success": true,
  "message": "Build deleted successfully"
}
```

### 4. Mettre à jour un build

Met à jour le nom ou le statut d'un build.

**Endpoint :** `PATCH /builds/{build_id}`

**Description :** Update Build Name or Status

**Paramètres de chemin :**

| Nom      | Type   | Description                      | Requis |
|----------|--------|----------------------------------|--------|
| build_id | string | L'identifiant unique du build    | Oui    |

**Corps de la requête :**

```json
{
  "name": "Nouveau nom du build",
  "status": "completed"
}
```

**Exemple de réponse :**

```json
{
  "success": true,
  "message": "Build updated successfully",
  "data": {
    "build_id": "build_12345",
    "name": "Nouveau nom du build",
    "status": "completed"
  }
}
```

### 5. Arrêter les tests par BuildID

Arrête tous les tests en cours d'exécution associés à un build spécifique.

**Endpoint :** `PUT /build/stop`

**Description :** Stop tests by BuildID

**Corps de la requête :**

```json
{
  "buildID": "build_12345"
}
```

**Exemple de réponse :**

```json
{
  "success": true,
  "message": "Tests stopped successfully"
}
```

## Codes d'erreur

| Code | Description                                    |
|------|------------------------------------------------|
| 400  | Requête invalide ou paramètres manquants       |
| 401  | Authentification requise                       |
| 403  | Accès non autorisé à cette ressource           |
| 404  | Build non trouvé                               |
| 500  | Erreur interne du serveur                      |
