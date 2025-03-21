# Vue d'ensemble de l'API LambdaTest

Cette documentation fournit un aperçu complet de l'API LambdaTest pour l'automation Selenium. L'API permet d'interagir programmatiquement avec la plateforme LambdaTest pour gérer vos tests automatisés, récupérer des informations sur les builds, les sessions, les logs, et plus encore.

## Informations générales

- **Version de l'API** : 1.0.1
- **Base URL** : `https://api.lambdatest.com/automation/api/v1`
- **Format de réponse** : JSON
- **Authentification** : Token d'API (voir la section Authentification ci-dessous)

## Authentification

Toutes les requêtes à l'API LambdaTest nécessitent une authentification. L'authentification se fait via Basic Auth en utilisant votre nom d'utilisateur LambdaTest et votre token d'accès.

Pour obtenir votre token d'accès :
1. Connectez-vous à votre compte LambdaTest
2. Accédez à la section des paramètres de votre profil
3. Recherchez la section "Access Key" ou "API Key"

Exemple d'authentification en utilisant cURL :

```bash
curl -u "username:access_key" https://api.lambdatest.com/automation/api/v1/builds
```

## Limites de l'API

L'API LambdaTest peut avoir des limites de taux (rate limits) pour éviter une utilisation excessive. Ces limites peuvent varier selon votre plan d'abonnement.

## Structure de l'API

L'API LambdaTest est organisée en plusieurs sections, chacune correspondant à un domaine fonctionnel spécifique :

### 1. Build

Endpoints pour gérer les builds de test, qui regroupent plusieurs sessions de test.

### 2. Session

Endpoints pour gérer les sessions de test individuelles, récupérer des informations sur les sessions, les captures d'écran, et plus encore.

### 3. Session Logs (V2)

Endpoints améliorés pour accéder aux différents types de logs des sessions (commandes, selenium, réseau, console, etc.).

### 4. Test

Endpoints pour gérer des tests spécifiques et leurs ressources associées.

### 5. Tunnel

Endpoints pour gérer les tunnels LambdaTest, qui permettent de tester des applications locales ou derrière un pare-feu.

### 6. Platforms

Endpoints pour récupérer des informations sur les plateformes de test disponibles.

### 7. Prerun

Endpoints pour gérer les fichiers d'exécution préalable, qui sont exécutés avant les tests.

### 8. User-files

Endpoints pour gérer les fichiers téléchargés par l'utilisateur.

### 9. Lighthouse

Endpoints pour accéder aux rapports de performance Lighthouse.

### 10. Organisation

Endpoints pour obtenir des informations sur votre organisation.

### 11. Project

Endpoints pour gérer les projets sur LambdaTest.

### 12. Extensions

Endpoints pour gérer les extensions utilisées dans les tests.

### 13. Resolution

Endpoints pour récupérer des informations sur les résolutions d'écran disponibles.

### 14. Geolocation

Endpoints pour gérer les tests avec différentes localisations géographiques.

## Formats de date

Plusieurs endpoints de l'API LambdaTest acceptent ou renvoient des dates. Le format de date standard utilisé est `YYYY-MM-DD`.

## Gestion des erreurs

L'API LambdaTest utilise les codes de statut HTTP standards pour indiquer le succès ou l'échec d'une requête API :

- 200 OK : La requête a réussi
- 400 Bad Request : La requête est mal formée ou contient des paramètres invalides
- 401 Unauthorized : Authentification manquante ou invalide
- 403 Forbidden : Vous n'avez pas les permissions nécessaires
- 404 Not Found : La ressource demandée n'existe pas
- 429 Too Many Requests : Vous avez dépassé la limite de taux
- 500 Internal Server Error : Une erreur est survenue du côté serveur

Les réponses d'erreur incluent généralement un message détaillé expliquant la cause de l'erreur.

## Documentation détaillée

Pour une documentation détaillée de chaque endpoint, veuillez consulter les fichiers individuels dans le dossier `endpoints/`.
