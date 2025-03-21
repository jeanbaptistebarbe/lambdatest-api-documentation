# API Tunnel

Cette section de l'API LambdaTest permet de gérer les tunnels, qui permettent d'accéder aux applications et sites web hébergés en local ou dans un environnement privé pour les tests automatisés.

## Base URL

```
https://api.lambdatest.com/automation/api/v1
```

## Endpoints

### 1. Récupérer tous les tunnels

Récupère la liste de tous les tunnels en cours d'exécution pour votre compte.

**Endpoint :** `GET /tunnels`

**Description :** Fetch running tunnels of your account.

**Paramètres de requête :**

| Nom    | Type    | Description                          | Requis |
|--------|---------|--------------------------------------|--------|
| offset | integer | Décalage pour la pagination          | Non    |
| limit  | integer | Nombre de tunnels à récupérer        | Non    |

**Exemple de réponse :**

```json
{
  "meta": {
    "total": 2,
    "offset": 0,
    "limit": 10
  },
  "data": [
    {
      "tunnel_id": "90a4f8f5-6c35-4b43-b56a-9b614c88c2f6",
      "tunnel_name": "dev-tunnel",
      "status": "running",
      "created_at": "2023-05-15T10:00:00Z",
      "connected_at": "2023-05-15T10:01:05Z",
      "last_activity": "2023-05-15T14:20:15Z",
      "user_id": "user_123",
      "ip": "192.168.1.10",
      "version": "3.2.5"
    },
    {
      "tunnel_id": "a5b3c2d1-7e6f-5g4h-3i2j-1k0l9m8n7o6p",
      "tunnel_name": "staging-tunnel",
      "status": "running",
      "created_at": "2023-05-14T15:30:00Z",
      "connected_at": "2023-05-14T15:31:10Z",
      "last_activity": "2023-05-15T13:45:20Z",
      "user_id": "user_123",
      "ip": "192.168.1.20",
      "version": "3.2.5"
    }
  ]
}
```

### 2. Arrêter un tunnel

Arrête un tunnel en cours d'exécution.

**Endpoint :** `DELETE /tunnels/{tunnel_id}`

**Description :** Stop a running tunnel

**Paramètres de chemin :**

| Nom       | Type   | Description                      | Requis |
|-----------|--------|----------------------------------|--------|
| tunnel_id | string | L'identifiant unique du tunnel   | Oui    |

**Exemple de réponse :**

```json
{
  "success": true,
  "message": "Tunnel stopped successfully"
}
```

## Utilisation des tunnels LambdaTest

Les tunnels LambdaTest sont utilisés pour établir une connexion sécurisée entre les machines virtuelles LambdaTest et votre environnement local ou privé. Voici les cas d'utilisation courants :

1. **Tests d'applications locales** : Tester des applications en cours de développement sur votre machine locale.
2. **Tests d'applications internes** : Tester des applications déployées dans un environnement interne non accessible publiquement.
3. **Tests d'applications derrière un pare-feu** : Tester des applications qui se trouvent derrière un pare-feu d'entreprise.
4. **Tests avec des données sensibles** : Sécuriser les tests impliquant des données sensibles qui ne doivent pas être exposées publiquement.

## Configuration des tunnels

Bien que l'API permette de gérer les tunnels existants, la création d'un tunnel se fait généralement via l'outil de ligne de commande LambdaTest Tunnel. L'API est utilisée pour surveiller et gérer les tunnels déjà créés.

Pour obtenir des informations sur la façon de configurer et d'utiliser l'outil LambdaTest Tunnel, veuillez consulter la documentation officielle de LambdaTest.

## Codes d'erreur

| Code | Description                                    |
|------|------------------------------------------------|
| 400  | Requête invalide ou paramètres manquants       |
| 401  | Authentification requise                       |
| 403  | Accès non autorisé à cette ressource           |
| 404  | Tunnel non trouvé                              |
| 500  | Erreur interne du serveur                      |
