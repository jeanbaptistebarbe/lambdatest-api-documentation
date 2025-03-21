# API Platforms

Cette section de l'API LambdaTest permet de récupérer des informations sur les plateformes disponibles pour les tests automatisés. Ces informations sont essentielles pour configurer correctement vos tests et garantir qu'ils s'exécutent sur les environnements souhaités.

## Base URL

```
https://api.lambdatest.com/automation/api/v1
```

## Endpoints

### 1. Récupérer les plateformes disponibles

Récupère la liste de toutes les plateformes disponibles pour les tests automatisés.

**Endpoint :** `GET /platforms`

**Description :** Fetch platforms

**Paramètres de requête :**

| Nom    | Type   | Description                                          | Requis |
|--------|--------|------------------------------------------------------|--------|
| type   | string | Type de plateforme (web, mobile, etc.)              | Non    |
| os     | string | Filtrer par système d'exploitation                   | Non    |
| browser| string | Filtrer par navigateur                               | Non    |

**Exemple de réponse :**

```json
{
  "data": {
    "web": [
      {
        "os": "Windows",
        "os_version": "10",
        "browsers": [
          {
            "name": "Chrome",
            "versions": ["90.0", "89.0", "88.0", "87.0", "86.0"]
          },
          {
            "name": "Firefox",
            "versions": ["88.0", "87.0", "86.0", "85.0", "84.0"]
          },
          {
            "name": "Edge",
            "versions": ["91.0", "90.0", "89.0", "88.0"]
          }
        ]
      },
      {
        "os": "macOS",
        "os_version": "Big Sur",
        "browsers": [
          {
            "name": "Chrome",
            "versions": ["90.0", "89.0", "88.0", "87.0", "86.0"]
          },
          {
            "name": "Firefox",
            "versions": ["88.0", "87.0", "86.0", "85.0", "84.0"]
          },
          {
            "name": "Safari",
            "versions": ["14.0", "13.1"]
          }
        ]
      }
    ],
    "mobile": [
      {
        "os": "Android",
        "os_versions": [
          {
            "version": "11.0",
            "devices": ["Galaxy S21", "Pixel 5", "OnePlus 9 Pro"]
          },
          {
            "version": "10.0",
            "devices": ["Galaxy S20", "Pixel 4", "OnePlus 8"]
          }
        ]
      },
      {
        "os": "iOS",
        "os_versions": [
          {
            "version": "14.5",
            "devices": ["iPhone 12 Pro", "iPhone 12", "iPhone 11"]
          },
          {
            "version": "14.0",
            "devices": ["iPhone 11 Pro", "iPhone SE 2020", "iPad Pro"]
          }
        ]
      }
    ]
  }
}
```

## Utilisation des données de plateforme

Les informations sur les plateformes sont généralement utilisées pour :

1. **Configurer les capabilities Selenium ou Appium** : Définir les combinaisons de navigateur, de système d'exploitation et d'appareil pour vos tests automatisés.
2. **Vérifier la disponibilité** : S'assurer que les plateformes que vous souhaitez cibler sont disponibles avant de lancer des tests.
3. **Automatiser la configuration des tests** : Créer des tests qui s'exécutent sur plusieurs plateformes en utilisant des données dynamiques.

## Exemple d'utilisation avec Selenium

Voici un exemple de la façon dont vous pourriez utiliser ces informations pour configurer des capabilities Selenium :

```java
DesiredCapabilities capabilities = new DesiredCapabilities();
capabilities.setCapability("browserName", "Chrome");
capabilities.setCapability("browserVersion", "90.0");
capabilities.setCapability("platformName", "Windows 10");

// Capabilities LambdaTest spécifiques
HashMap<String, Object> ltOptions = new HashMap<String, Object>();
ltOptions.put("build", "Exemple de build");
ltOptions.put("name", "Test sur Windows 10 et Chrome 90");
ltOptions.put("resolution", "1920x1080");
capabilities.setCapability("LT:Options", ltOptions);
```

## Réponses adaptatives

La réponse de l'API des plateformes est adaptative et peut changer au fil du temps à mesure que de nouvelles plateformes sont ajoutées et que les anciennes sont retirées. Assurez-vous que votre code est capable de gérer ces changements.

## Codes d'erreur

| Code | Description                                    |
|------|------------------------------------------------|
| 400  | Requête invalide ou paramètres manquants       |
| 401  | Authentification requise                       |
| 403  | Accès non autorisé à cette ressource           |
| 500  | Erreur interne du serveur                      |
