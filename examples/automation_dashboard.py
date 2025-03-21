"""
Tableau de bord d'automatisation LambdaTest

Ce script crée un tableau de bord en temps réel pour surveiller les tests d'automatisation 
en cours d'exécution sur LambdaTest. Il utilise l'API LambdaTest pour récupérer les 
informations sur les sessions actives et affiche leur statut dans une interface console.

Dépendances:
- requests
- prettytable
- colorama

Installation:
pip install requests prettytable colorama
"""

import os
import time
import requests
from requests.auth import HTTPBasicAuth
import json
from datetime import datetime
from prettytable import PrettyTable
from colorama import init, Fore, Style

# Initialiser colorama
init()

# Configuration de l'authentification LambdaTest
LT_USERNAME = os.environ.get('LT_USERNAME', 'your_username')
LT_ACCESS_KEY = os.environ.get('LT_ACCESS_KEY', 'your_access_key')

# Configuration de l'API
BASE_URL = "https://api.lambdatest.com/automation/api/v1"
REFRESH_INTERVAL = 30  # secondes


def clear_screen():
    """Efface l'écran du terminal"""
    os.system('cls' if os.name == 'nt' else 'clear')


def format_duration(seconds):
    """Formate les secondes en une chaîne de durée lisible"""
    if seconds is None:
        return "N/A"
    
    minutes, seconds = divmod(seconds, 60)
    hours, minutes = divmod(minutes, 60)
    
    if hours > 0:
        return f"{int(hours)}h {int(minutes)}m {int(seconds)}s"
    elif minutes > 0:
        return f"{int(minutes)}m {int(seconds)}s"
    else:
        return f"{int(seconds)}s"


def get_status_color(status):
    """Renvoie la couleur appropriée pour un statut de session"""
    status_lower = status.lower() if status else ""
    
    if status_lower == "running":
        return Fore.BLUE
    elif status_lower == "queued":
        return Fore.YELLOW
    elif status_lower == "completed":
        return Fore.GREEN
    elif status_lower in ["error", "timeout", "failed"]:
        return Fore.RED
    else:
        return ""


def get_active_sessions():
    """Récupère les sessions actives depuis l'API LambdaTest"""
    try:
        response = requests.get(
            f"{BASE_URL}/sessions",
            auth=HTTPBasicAuth(LT_USERNAME, LT_ACCESS_KEY),
            params={
                "status": "running,queued",
                "limit": 100
            }
        )
        
        if response.status_code == 200:
            return response.json().get("data", [])
        else:
            print(f"Erreur lors de la récupération des sessions: {response.status_code}")
            print(response.text)
            return []
    except Exception as e:
        print(f"Exception lors de la récupération des sessions: {str(e)}")
        return []


def get_recent_sessions():
    """Récupère les sessions récemment terminées depuis l'API LambdaTest"""
    try:
        response = requests.get(
            f"{BASE_URL}/sessions",
            auth=HTTPBasicAuth(LT_USERNAME, LT_ACCESS_KEY),
            params={
                "status": "completed,error,timeout",
                "limit": 10
            }
        )
        
        if response.status_code == 200:
            return response.json().get("data", [])
        else:
            print(f"Erreur lors de la récupération des sessions récentes: {response.status_code}")
            return []
    except Exception as e:
        print(f"Exception lors de la récupération des sessions récentes: {str(e)}")
        return []


def get_build_summary():
    """Récupère un résumé des builds en cours et récents"""
    try:
        response = requests.get(
            f"{BASE_URL}/builds",
            auth=HTTPBasicAuth(LT_USERNAME, LT_ACCESS_KEY),
            params={
                "limit": 5
            }
        )
        
        if response.status_code == 200:
            return response.json().get("data", [])
        else:
            print(f"Erreur lors de la récupération des builds: {response.status_code}")
            return []
    except Exception as e:
        print(f"Exception lors de la récupération des builds: {str(e)}")
        return []


def display_dashboard():
    """Affiche le tableau de bord dans la console"""
    while True:
        clear_screen()
        
        print(f"\n{Fore.CYAN}=== LAMBDATEST DASHBOARD ==={Style.RESET_ALL}")
        print(f"Dernière mise à jour: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print(f"Username: {LT_USERNAME}")
        
        # Récupérer les données
        active_sessions = get_active_sessions()
        recent_sessions = get_recent_sessions()
        builds = get_build_summary()
        
        # Afficher les sessions actives
        print(f"\n{Fore.CYAN}Sessions actives ({len(active_sessions)}){Style.RESET_ALL}")
        if active_sessions:
            active_table = PrettyTable()
            active_table.field_names = ["ID", "Nom", "Navigateur", "OS", "Statut", "Durée", "Build"]
            active_table.align = "l"
            active_table.max_width = 30
            
            for session in active_sessions:
                status = session.get("status", "")
                status_colored = f"{get_status_color(status)}{status}{Style.RESET_ALL}"
                
                # Calculer la durée pour les sessions en cours
                start_time = session.get("start_timestamp")
                duration = "En attente"
                if start_time and status.lower() == "running":
                    start_dt = datetime.fromisoformat(start_time.replace("Z", "+00:00"))
                    duration_sec = (datetime.now() - start_dt).total_seconds()
                    duration = format_duration(duration_sec)
                
                active_table.add_row([
                    session.get("session_id", "")[:8] + "...",
                    session.get("name", "N/A")[:25] + ("..." if len(session.get("name", "")) > 25 else ""),
                    f"{session.get('browser', 'N/A')} {session.get('browser_version', '')}",
                    f"{session.get('os', 'N/A')} {session.get('os_version', '')}",
                    status_colored,
                    duration,
                    session.get("build_id", "N/A")[:8] + "..."
                ])
            
            print(active_table)
        else:
            print("Aucune session active actuellement")
        
        # Afficher les sessions récentes
        print(f"\n{Fore.CYAN}Sessions récentes ({len(recent_sessions)}){Style.RESET_ALL}")
        if recent_sessions:
            recent_table = PrettyTable()
            recent_table.field_names = ["ID", "Nom", "Navigateur", "OS", "Statut", "Durée"]
            recent_table.align = "l"
            recent_table.max_width = 30
            
            for session in recent_sessions:
                status = session.get("status", "")
                status_colored = f"{get_status_color(status)}{status}{Style.RESET_ALL}"
                
                recent_table.add_row([
                    session.get("session_id", "")[:8] + "...",
                    session.get("name", "N/A")[:25] + ("..." if len(session.get("name", "")) > 25 else ""),
                    f"{session.get('browser', 'N/A')} {session.get('browser_version', '')}",
                    f"{session.get('os', 'N/A')} {session.get('os_version', '')}",
                    status_colored,
                    format_duration(session.get("duration"))
                ])
            
            print(recent_table)
        else:
            print("Aucune session récente")
        
        # Afficher le résumé des builds
        print(f"\n{Fore.CYAN}Builds récents ({len(builds)}){Style.RESET_ALL}")
        if builds:
            build_table = PrettyTable()
            build_table.field_names = ["ID", "Nom", "Total", "Réussis", "Échoués", "Statut"]
            build_table.align = "l"
            
            for build in builds:
                status = build.get("status_ind", "")
                status_colored = f"{get_status_color(status)}{status}{Style.RESET_ALL}"
                
                build_table.add_row([
                    build.get("build_id", "")[:8] + "...",
                    build.get("build_name", "N/A")[:30] + ("..." if len(build.get("build_name", "")) > 30 else ""),
                    build.get("total_tests", "N/A"),
                    f"{Fore.GREEN}{build.get('passed_tests', 'N/A')}{Style.RESET_ALL}",
                    f"{Fore.RED}{build.get('failed_tests', 'N/A')}{Style.RESET_ALL}",
                    status_colored
                ])
            
            print(build_table)
        else:
            print("Aucun build récent")
        
        # Commandes disponibles
        print(f"\n{Fore.CYAN}Commandes:{Style.RESET_ALL}")
        print("Appuyez sur Ctrl+C pour quitter")
        
        # Attendre avant de rafraîchir
        try:
            time.sleep(REFRESH_INTERVAL)
        except KeyboardInterrupt:
            print("\nArrêt du tableau de bord...")
            break


def stop_session(session_id):
    """Arrête une session en cours d'exécution"""
    try:
        response = requests.put(
            f"{BASE_URL}/sessions/{session_id}/stop",
            auth=HTTPBasicAuth(LT_USERNAME, LT_ACCESS_KEY)
        )
        
        if response.status_code == 200:
            print(f"Session {session_id} arrêtée avec succès")
            return True
        else:
            print(f"Erreur lors de l'arrêt de la session: {response.status_code}")
            print(response.text)
            return False
    except Exception as e:
        print(f"Exception lors de l'arrêt de la session: {str(e)}")
        return False


def main():
    """Fonction principale"""
    print(f"{Fore.CYAN}=== LAMBDATEST AUTOMATION DASHBOARD ==={Style.RESET_ALL}")
    print("Initialisation du tableau de bord...")
    
    # Vérifier les identifiants
    if LT_USERNAME == 'your_username' or LT_ACCESS_KEY == 'your_access_key':
        print(f"{Fore.RED}ERREUR: Veuillez configurer vos identifiants LambdaTest{Style.RESET_ALL}")
        print("Définissez les variables d'environnement LT_USERNAME et LT_ACCESS_KEY")
        print("Ou modifiez les valeurs dans le script")
        return
    
    # Essayer de se connecter à l'API
    try:
        response = requests.get(
            f"{BASE_URL}/builds",
            auth=HTTPBasicAuth(LT_USERNAME, LT_ACCESS_KEY),
            params={"limit": 1}
        )
        
        if response.status_code != 200:
            print(f"{Fore.RED}ERREUR: Impossible de se connecter à l'API LambdaTest{Style.RESET_ALL}")
            print(f"Code d'état: {response.status_code}")
            print(f"Réponse: {response.text}")
            return
    except Exception as e:
        print(f"{Fore.RED}ERREUR: Exception lors de la connexion à l'API{Style.RESET_ALL}")
        print(f"Exception: {str(e)}")
        return
    
    # Démarrer le tableau de bord
    try:
        display_dashboard()
    except KeyboardInterrupt:
        print("\nTableau de bord arrêté par l'utilisateur")
    except Exception as e:
        print(f"{Fore.RED}Erreur inattendue: {str(e)}{Style.RESET_ALL}")


if __name__ == "__main__":
    main()
