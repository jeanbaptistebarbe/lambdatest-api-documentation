# API Test

Cette section de l'API LambdaTest permet d'interagir directement avec des tests spécifiques, de gérer leurs ressources associées et d'accéder à leurs détails.

## Base URL

```
https://api.lambdatest.com/automation/api/v1
```

## Endpoints

### 1. Télécharger des logs d'assertion pour un test

Téléverse des logs d'assertion pour un test spécifique.

**Endpoint :** `POST /tests/{test_id}/exceptions`

**Description :** Upload assertion logs to our lambda storage

**Paramètres de chemin :**

| Nom     | Type   | Description                    | Requis |
|---------|--------|--------------------------------|--------|
| test_id | string | L'identifiant unique du test   | Oui    |

**Corps de la requête :**
Le corps de la requête doit contenir les logs d'assertion à téléverser, généralement au format JSON.

**Exemple de corps de requête :**
```json
{
  "assertions": [
    {
      "timestamp": "2023-05-15T10:30:15Z",
      "type": "expect",
      "expected": "Welcome to Dashboard",
      "actual": "Welcome to Dashboard",
      "result": "passed",
      "location": "login_test.js:45"
    },
    {
      "timestamp": "2023-05-15T10:30:20Z",
      "type": "assert",
      "expected": true,
      "actual": false,
      "result": "failed",
      "message": "Expected element to be visible",
      "location": "login_test.js:52"
    }
  ]
}
```

**Exemple de réponse :**
```json
{
  "success": true,
  "message": "Assertion logs uploaded successfully"
}
```

### 2. Récupérer la vidéo d'un test

Récupère la vidéo enregistrée d'un test spécifique.

**Endpoint :** `GET /test/{test_id}/video`

**Description :** Fetch recorded video of a test id.

**Paramètres de chemin :**

| Nom     | Type   | Description                    | Requis |
|---------|--------|--------------------------------|--------|
| test_id | string | L'identifiant unique du test   | Oui    |

**Exemple de réponse :**
```json
{
  "status": "success",
  "data": {
    "video_url": "https://example.com/videos/test_98765.mp4",
    "expires_at": "2023-05-18T10:30:00Z"
  }
}
```

## Différence entre Tests et Sessions

Dans l'API LambdaTest, il est important de comprendre la distinction entre les tests et les sessions :

- Un **test** représente un cas de test individuel qui est exécuté. Il est généralement associé à une fonction de test spécifique dans votre suite de tests.

- Une **session** représente une instance de navigateur ou d'application sur une plateforme spécifique. Une session peut contenir plusieurs tests.

Certaines ressources comme les vidéos et les logs peuvent être accessibles à la fois au niveau du test et au niveau de la session, offrant une flexibilité dans la façon dont vous interagissez avec l'API.

## Codes d'erreur

| Code | Description                                    |
|------|------------------------------------------------|
| 400  | Requête invalide ou paramètres manquants       |
| 401  | Authentification requise                       |
| 403  | Accès non autorisé à cette ressource           |
| 404  | Test non trouvé                                |
| 500  | Erreur interne du serveur                      |
