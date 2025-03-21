# Guide de démarrage rapide avec l'API LambdaTest

Ce guide vous aidera à commencer rapidement avec l'API LambdaTest pour l'automation Selenium. Vous apprendrez à configurer l'authentification, à exécuter des requêtes API de base et à intégrer l'API dans vos workflows d'automatisation.

## Prérequis

Avant de commencer, assurez-vous d'avoir :

- Un compte LambdaTest actif
- Votre nom d'utilisateur et votre clé d'accès LambdaTest
- Un client HTTP comme cURL, Postman, ou une bibliothèque dans votre langage de programmation préféré

## Obtenir vos identifiants d'API

1. Connectez-vous à votre compte LambdaTest sur [https://accounts.lambdatest.com/login](https://accounts.lambdatest.com/login)
2. Accédez à votre profil en cliquant sur votre avatar en haut à droite
3. Allez dans la section **Clés d'accès** ou **Profil**
4. Notez votre **nom d'utilisateur** et votre **clé d'accès**

## Authentification

L'API LambdaTest utilise l'authentification HTTP Basic. Vous devez fournir votre nom d'utilisateur et votre clé d'accès pour chaque requête.

### Exemple avec cURL

```bash
curl -u "username:access_key" https://api.lambdatest.com/automation/api/v1/builds
```

### Exemple avec Python

```python
import requests
from requests.auth import HTTPBasicAuth

username = "your_username"
access_key = "your_access_key"

response = requests.get(
    "https://api.lambdatest.com/automation/api/v1/builds",
    auth=HTTPBasicAuth(username, access_key)
)

print(response.json())
```

### Exemple avec Node.js

```javascript
const axios = require('axios');

const username = 'your_username';
const accessKey = 'your_access_key';

// Créer un encodage Base64 des identifiants
const auth = Buffer.from(`${username}:${accessKey}`).toString('base64');

axios.get('https://api.lambdatest.com/automation/api/v1/builds', {
  headers: {
    'Authorization': `Basic ${auth}`
  }
})
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.error('Erreur:', error);
});
```

## Exemples d'utilisation courants

### 1. Récupérer les derniers builds

```bash
curl -u "username:access_key" \
     -G \
     -d "limit=5" \
     https://api.lambdatest.com/automation/api/v1/builds
```

### 2. Récupérer les détails d'une session spécifique

```bash
curl -u "username:access_key" \
     https://api.lambdatest.com/automation/api/v1/sessions/session_123456
```

### 3. Arrêter une session en cours

```bash
curl -u "username:access_key" \
     -X PUT \
     https://api.lambdatest.com/automation/api/v1/sessions/session_123456/stop
```

### 4. Récupérer la vidéo d'une session

```bash
curl -u "username:access_key" \
     https://api.lambdatest.com/automation/api/v1/sessions/session_123456/video
```

### 5. Vérifier les plateformes disponibles

```bash
curl -u "username:access_key" \
     https://api.lambdatest.com/automation/api/v1/platforms
```

## Intégration dans votre flux de CI/CD

Vous pouvez intégrer l'API LambdaTest dans votre pipeline CI/CD pour automatiser des tâches comme :

1. **Vérifier l'état des tests** : Récupérer les résultats des tests automatisés
2. **Gérer les ressources** : Nettoyer automatiquement les anciens builds ou sessions
3. **Reporting automatisé** : Extraire des données pour générer des rapports personnalisés

### Exemple avec GitHub Actions

```yaml
name: LambdaTest API Integration

on:
  schedule:
    - cron: '0 0 * * *'  # Exécution quotidienne à minuit

jobs:
  cleanup-old-builds:
    runs-on: ubuntu-latest
    steps:
      - name: Clean up old builds
        run: |
          # Récupérer les builds de plus de 30 jours
          OLD_BUILDS=$(curl -s -u "${{ secrets.LT_USERNAME }}:${{ secrets.LT_ACCESS_KEY }}" \
            -G \
            -d "fromdate=$(date -d '30 days ago' +%Y-%m-%d)" \
            https://api.lambdatest.com/automation/api/v1/builds | jq -r '.data[].build_id')
          
          # Supprimer chaque build ancien
          for BUILD_ID in $OLD_BUILDS; do
            curl -s -u "${{ secrets.LT_USERNAME }}:${{ secrets.LT_ACCESS_KEY }}" \
              -X DELETE \
              https://api.lambdatest.com/automation/api/v1/builds/$BUILD_ID
            echo "Supprimé build $BUILD_ID"
          done
```

## Conseils pour une utilisation efficace

1. **Pagination** : Utilisez les paramètres `limit` et `offset` pour paginer les résultats des endpoints qui renvoient de grandes listes.

2. **Filtrage** : Utilisez les paramètres de filtrage disponibles pour réduire la quantité de données à traiter.

3. **Gestion des erreurs** : Assurez-vous de gérer correctement les erreurs et de vérifier les codes de statut HTTP dans vos intégrations.

4. **Rate Limiting** : Évitez de faire trop de requêtes dans un court laps de temps pour ne pas atteindre les limites de taux imposées par LambdaTest.

5. **Mises en cache** : Mettez en cache les réponses qui ne changent pas fréquemment, comme les informations sur les plateformes disponibles.

## Scénarios d'utilisation avancés

### Automatisation des tests de régression

Vous pouvez utiliser l'API pour automatiser la gestion des tests de régression :

```python
import requests
from requests.auth import HTTPBasicAuth
import time
import json

username = "your_username"
access_key = "your_access_key"
auth = HTTPBasicAuth(username, access_key)
base_url = "https://api.lambdatest.com/automation/api/v1"

# Créer un nouveau build pour les tests de régression
build_data = {
    "name": f"Regression Tests - {time.strftime('%Y-%m-%d')}",
    "description": "Tests de régression automatisés"
}

response = requests.post(f"{base_url}/build", auth=auth, json=build_data)
build_id = response.json()["data"]["build_id"]

# Exécuter vos tests...

# Une fois les tests terminés, récupérer les résultats
response = requests.get(f"{base_url}/builds/{build_id}", auth=auth)
results = response.json()["data"]

# Analyser les résultats
passed = results["passed_tests"]
failed = results["failed_tests"]
total = results["total_tests"]

print(f"Tests de régression terminés: {passed}/{total} réussis, {failed}/{total} échoués")

# Si des tests ont échoué, créer un ticket dans votre système de suivi
if failed > 0:
    # Récupérer les détails des sessions en échec
    sessions_response = requests.get(
        f"{base_url}/sessions", 
        auth=auth,
        params={"build_id": build_id, "status": "failed"}
    )
    failed_sessions = sessions_response.json()["data"]
    
    # Créer un rapport détaillé des échecs
    # ...
```

### Génération de rapports personnalisés

Vous pouvez utiliser l'API pour générer des rapports personnalisés sur l'utilisation et les performances des tests :

```javascript
const axios = require('axios');
const fs = require('fs');

const username = 'your_username';
const accessKey = 'your_access_key';
const auth = Buffer.from(`${username}:${accessKey}`).toString('base64');
const baseUrl = 'https://api.lambdatest.com/automation/api/v1';

// Obtenir les statistiques des builds des 30 derniers jours
const thirtyDaysAgo = new Date();
thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
const fromDate = thirtyDaysAgo.toISOString().split('T')[0];

async function generateReport() {
  try {
    // Récupérer tous les builds dans la période
    const buildsResponse = await axios.get(`${baseUrl}/builds`, {
      headers: { 'Authorization': `Basic ${auth}` },
      params: {
        fromdate: fromDate,
        limit: 100
      }
    });
    
    const builds = buildsResponse.data.data;
    
    // Analyser les builds pour générer des statistiques
    const stats = {
      totalBuilds: builds.length,
      totalTests: 0,
      passedTests: 0,
      failedTests: 0,
      browserStats: {},
      osStats: {},
      durationStats: []
    };
    
    // Calculer les statistiques
    builds.forEach(build => {
      stats.totalTests += build.total_tests || 0;
      stats.passedTests += build.passed_tests || 0;
      stats.failedTests += build.failed_tests || 0;
      stats.durationStats.push({
        buildName: build.build_name,
        duration: build.duration
      });
      
      // Récupérer plus de détails pour chaque build si nécessaire
    });
    
    // Créer le rapport
    const report = {
      title: `Rapport d'utilisation LambdaTest - ${new Date().toISOString().split('T')[0]}`,
      period: `${fromDate} à aujourd'hui`,
      statistics: stats,
      // Ajouter plus de sections au rapport selon vos besoins
    };
    
    // Sauvegarder le rapport
    fs.writeFileSync('lambdatest_report.json', JSON.stringify(report, null, 2));
    console.log('Rapport généré avec succès: lambdatest_report.json');
    
  } catch (error) {
    console.error('Erreur lors de la génération du rapport:', error);
  }
}

generateReport();
```

## Ressources additionnelles

- [Documentation complète de l'API](endpoints/index.md)
- [Vue d'ensemble de l'API](API-Overview.md)
- [Documentation officielle LambdaTest](https://www.lambdatest.com/support/docs/api-doc/)

Pour toute question ou assistance concernant l'API LambdaTest, veuillez contacter le support LambdaTest ou consulter leur documentation officielle.
