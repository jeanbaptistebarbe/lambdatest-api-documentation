/**
 * Exemple d'utilisation de l'API LambdaTest pour créer un rapport de tests automatisé
 * 
 * Ce script récupère les résultats des tests récents et génère un rapport HTML
 * contenant les statistiques et les tendances de performance.
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Configuration de l'authentification LambdaTest
const LT_USERNAME = process.env.LT_USERNAME || 'your_username';
const LT_ACCESS_KEY = process.env.LT_ACCESS_KEY || 'your_access_key';
const auth = Buffer.from(`${LT_USERNAME}:${LT_ACCESS_KEY}`).toString('base64');

// Configuration de l'API LambdaTest
const BASE_URL = 'https://api.lambdatest.com/automation/api/v1';
const DAYS_TO_ANALYZE = 14; // Analyser les tests des 14 derniers jours

/**
 * Fonction principale qui orchestre la génération du rapport
 */
async function generateTestReport() {
  try {
    console.log('Génération du rapport de tests LambdaTest...');
    
    // Calculer la date de début de la période d'analyse
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - DAYS_TO_ANALYZE);
    const fromDateStr = startDate.toISOString().split('T')[0]; // Format YYYY-MM-DD
    
    console.log(`Période d'analyse: ${fromDateStr} à aujourd'hui`);
    
    // Récupérer tous les builds de la période
    const builds = await fetchAllBuilds(fromDateStr);
    console.log(`Récupéré ${builds.length} builds de la période`);
    
    if (builds.length === 0) {
      console.log('Aucun build trouvé pour la période spécifiée');
      return;
    }
    
    // Analyser les builds pour extraire des statistiques
    const buildStats = analyzeBuildStats(builds);
    
    // Pour chaque build avec des échecs, récupérer les détails des sessions échouées
    const failedSessions = await fetchFailedSessions(builds);
    
    // Générer le rapport HTML
    generateHtmlReport(buildStats, failedSessions);
    
    console.log('Rapport généré avec succès: test_report.html');
  } catch (error) {
    console.error('Erreur lors de la génération du rapport:', error.message);
    if (error.response) {
      console.error('Détails de l\'erreur API:', {
        status: error.response.status,
        data: error.response.data
      });
    }
  }
}

/**
 * Récupère tous les builds de la période spécifiée
 */
async function fetchAllBuilds(fromDate) {
  const builds = [];
  let offset = 0;
  const limit = 50;
  let hasMore = true;
  
  while (hasMore) {
    try {
      const response = await axios.get(`${BASE_URL}/builds`, {
        headers: { 'Authorization': `Basic ${auth}` },
        params: {
          fromdate: fromDate,
          limit,
          offset
        }
      });
      
      const data = response.data;
      builds.push(...data.data);
      
      // Vérifier s'il y a plus de résultats à récupérer
      offset += limit;
      hasMore = data.data.length === limit;
    } catch (error) {
      console.error('Erreur lors de la récupération des builds:', error.message);
      hasMore = false;
    }
  }
  
  return builds;
}

/**
 * Récupère les sessions échouées pour les builds spécifiés
 */
async function fetchFailedSessions(builds) {
  const failedSessions = [];
  
  // Traiter uniquement les builds avec des tests échoués
  const buildsWithFailures = builds.filter(build => 
    build.failed_tests && build.failed_tests > 0
  );
  
  for (const build of buildsWithFailures) {
    try {
      const response = await axios.get(`${BASE_URL}/sessions`, {
        headers: { 'Authorization': `Basic ${auth}` },
        params: {
          build_id: build.build_id,
          status: 'failed'
        }
      });
      
      // Associer l'ID du build à chaque session échouée
      const sessions = response.data.data.map(session => ({
        ...session,
        build_id: build.build_id,
        build_name: build.build_name
      }));
      
      failedSessions.push(...sessions);
    } catch (error) {
      console.error(`Erreur lors de la récupération des sessions échouées pour build ${build.build_id}:`, error.message);
    }
  }
  
  return failedSessions;
}

/**
 * Analyse les statistiques des builds
 */
function analyzeBuildStats(builds) {
  // Calculer les statistiques globales
  const stats = {
    totalBuilds: builds.length,
    totalTests: builds.reduce((sum, build) => sum + (build.total_tests || 0), 0),
    passedTests: builds.reduce((sum, build) => sum + (build.passed_tests || 0), 0),
    failedTests: builds.reduce((sum, build) => sum + (build.failed_tests || 0), 0),
    averageDuration: builds.reduce((sum, build) => sum + (build.duration || 0), 0) / builds.length,
    
    // Statistiques par navigateur
    browserStats: {},
    
    // Statistiques par système d'exploitation
    osStats: {},
    
    // Tendance des tests sur la période
    dailyStats: {},
    
    // Les 5 builds les plus récents
    recentBuilds: builds.slice(0, 5)
  };
  
  // Calculer le taux de réussite
  stats.successRate = stats.totalTests > 0 
    ? ((stats.passedTests / stats.totalTests) * 100).toFixed(2)
    : 0;
  
  // Analyser les données par jour pour les tendances
  builds.forEach(build => {
    const date = new Date(build.start_timestamp || build.created_at).toISOString().split('T')[0];
    
    if (!stats.dailyStats[date]) {
      stats.dailyStats[date] = {
        total: 0,
        passed: 0,
        failed: 0
      };
    }
    
    stats.dailyStats[date].total += (build.total_tests || 0);
    stats.dailyStats[date].passed += (build.passed_tests || 0);
    stats.dailyStats[date].failed += (build.failed_tests || 0);
  });
  
  return stats;
}

/**
 * Génère un rapport HTML avec les statistiques et les erreurs
 */
function generateHtmlReport(stats, failedSessions) {
  // Créer le dossier examples si nécessaire
  const dir = path.dirname(__filename);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  // Convertir les statistiques quotidiennes en tableaux pour le graphique
  const dates = Object.keys(stats.dailyStats).sort();
  const successRateData = dates.map(date => {
    const dayStats = stats.dailyStats[date];
    return dayStats.total > 0 
      ? ((dayStats.passed / dayStats.total) * 100).toFixed(2)
      : 0;
  });
  
  // Générer le contenu HTML
  const html = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rapport de Tests LambdaTest</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    h1, h2, h3 {
      color: #2c3e50;
    }
    .card {
      background: #fff;
      border-radius: 5px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      padding: 20px;
      margin-bottom: 20px;
    }
    .stats-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      grid-gap: 20px;
    }
    .stat-card {
      background: #f8f9fa;
      border-radius: 5px;
      padding: 15px;
      text-align: center;
    }
    .stat-value {
      font-size: 24px;
      font-weight: bold;
      margin: 10px 0;
    }
    .stat-label {
      font-size: 14px;
      color: #6c757d;
    }
    .success-rate {
      color: #28a745;
    }
    .failure-rate {
      color: #dc3545;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }
    th, td {
      padding: 12px 15px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    th {
      background-color: #f8f9fa;
    }
    tr:hover {
      background-color: #f1f1f1;
    }
    .chart-container {
      height: 300px;
      margin: 20px 0;
    }
  </style>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
  <h1>Rapport de Tests LambdaTest</h1>
  <p>Période d'analyse: ${dates[0]} à ${dates[dates.length - 1]}</p>
  
  <div class="card">
    <h2>Statistiques globales</h2>
    <div class="stats-container">
      <div class="stat-card">
        <div class="stat-label">Nombre total de builds</div>
        <div class="stat-value">${stats.totalBuilds}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Nombre total de tests</div>
        <div class="stat-value">${stats.totalTests}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Taux de réussite</div>
        <div class="stat-value success-rate">${stats.successRate}%</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Tests réussis</div>
        <div class="stat-value success-rate">${stats.passedTests}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Tests échoués</div>
        <div class="stat-value failure-rate">${stats.failedTests}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Durée moyenne (sec)</div>
        <div class="stat-value">${Math.round(stats.averageDuration)}</div>
      </div>
    </div>
  </div>
  
  <div class="card">
    <h2>Tendance du taux de réussite</h2>
    <div class="chart-container">
      <canvas id="successRateChart"></canvas>
    </div>
  </div>
  
  <div class="card">
    <h2>Builds récents</h2>
    <table>
      <thead>
        <tr>
          <th>Nom du build</th>
          <th>Date de début</th>
          <th>Total tests</th>
          <th>Réussis</th>
          <th>Échoués</th>
          <th>Taux de réussite</th>
        </tr>
      </thead>
      <tbody>
        ${stats.recentBuilds.map(build => `
          <tr>
            <td>${build.build_name || 'Sans nom'}</td>
            <td>${new Date(build.start_timestamp || build.created_at).toLocaleString()}</td>
            <td>${build.total_tests || 0}</td>
            <td>${build.passed_tests || 0}</td>
            <td>${build.failed_tests || 0}</td>
            <td>${build.total_tests > 0 ? ((build.passed_tests / build.total_tests) * 100).toFixed(2) : 0}%</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  </div>
  
  ${failedSessions.length > 0 ? `
  <div class="card">
    <h2>Sessions échouées (${failedSessions.length})</h2>
    <table>
      <thead>
        <tr>
          <th>Build</th>
          <th>Navigateur</th>
          <th>Système</th>
          <th>Date</th>
          <th>Raison de l'échec</th>
        </tr>
      </thead>
      <tbody>
        ${failedSessions.map(session => `
          <tr>
            <td>${session.build_name || 'Sans nom'}</td>
            <td>${session.browser || ''} ${session.browser_version || ''}</td>
            <td>${session.os || ''} ${session.os_version || ''}</td>
            <td>${new Date(session.start_timestamp || session.created_at).toLocaleString()}</td>
            <td>${session.reason || session.status || 'Non spécifié'}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  </div>
  ` : ''}
  
  <script>
    // Graphique de tendance du taux de réussite
    const ctx = document.getElementById('successRateChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ${JSON.stringify(dates)},
        datasets: [{
          label: 'Taux de réussite (%)',
          data: ${JSON.stringify(successRateData)},
          borderColor: '#28a745',
          backgroundColor: 'rgba(40, 167, 69, 0.1)',
          borderWidth: 2,
          tension: 0.1,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            title: {
              display: true,
              text: 'Taux de réussite (%)'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Date'
            }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.parsed.y + '%';
              }
            }
          }
        }
      }
    });
  </script>
</body>
</html>
  `;
  
  // Écrire le fichier HTML
  fs.writeFileSync(path.join(dir, 'test_report.html'), html);
}

// Exécuter le script
generateTestReport();
