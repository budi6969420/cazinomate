# Casino-Anwendung

Dies ist eine Casino-Anwendung mit einem Spring Boot Backend und einem React Frontend.

Läuft aktuell auf: https://cazinomate.de

## Voraussetzungen

* Docker und Docker Compose
* Java 17 oder höher
* Node.js und npm
* Make

## Verfügbare Make-Befehle

### Anwendung starten

```bash
make start
```

Alias für `make start-local`. Dieser Befehl führt Folgendes aus:

* Startet die Lade-Seite (`loading-next`)
* Startet die Docker-Dienste
* Wartet, bis die Keycloak-Datenbank bereit ist
* Startet das Spring Boot Backend
* Startet das React Frontend im Entwicklungsmodus
* Erstellt eine neue Logdatei mit Zeitstempel und verlinkt sie als `casino.log`

### Nur Lade-Seite starten

```bash
make start-loading
```

Startet nur die Lade-Seite. Installiert bei Bedarf automatisch Abhängigkeiten und baut das Projekt.

### Auf Server deployen

```bash
make deploy-server
```

Führt einen Produktions-Deployment-Prozess aus:

* Installiert und baut die Lade-Seite
* Baut das Backend als Spring Boot JAR
* Installiert und baut das Frontend im Produktionsmodus (mittels Angular CLI)

### Logs anzeigen

```bash
make logs
```

Zeigt die Live-Anwendungs-Logs an. Die Logs werden in einer Datei mit Zeitstempel gespeichert (z. B. `casino_20240315_123456.log`) und über einen Symlink als `casino.log` verfügbar gemacht.

### Anwendung stoppen

```bash
make stop
```

Dieser Befehl:

* Stoppt die Lade-Seite, das Frontend und das Backend
* Stoppt alle Docker-Container
* Löscht alle Logdateien

### Alles bereinigen

```bash
make clean
```

Dies ist eine gründlichere Bereinigung, die:

* Alle Dienste stoppt (`make stop` wird aufgerufen)
* Übrig gebliebene Backend- oder Frontend-Prozesse beendet
* Alle Logdateien entfernt

## Logdateien

* Logdateien werden mit Zeitstempel erstellt (z. B. `casino_20240315_123456.log`)
* Die aktuellste Logdatei ist immer über `casino.log` verfügbar
* Beim Stoppen der Anwendung werden Logs automatisch gelöscht
* Mit `make logs` können Live-Logs angezeigt werden

## Entwicklung

Die Anwendung besteht aus:

* **Backend**: Spring Boot Anwendung im Verzeichnis `backend`
  → Läuft auf [http://localhost:8080](http://localhost:8080)

* **Frontend**: React Anwendung im Verzeichnis `frontend`
  → Läuft im Entwicklungsmodus auf [http://localhost:4200](http://localhost:4200)

* **Lade-Seite**: Next.js App im Verzeichnis `loading-next`
  → Läuft auf [http://localhost:3000](http://localhost:3000)

* **Keycloak** (Docker-Dienst)
  → Erreichbar über [http://localhost:9090](http://localhost:9090)

* **Docker-Dienste**: Konfiguration im Verzeichnis `docker`

## Fehlerbehebung

Wenn Probleme auftreten:

1. Führe `make clean` aus, um einen sauberen Zustand herzustellen
2. Überprüfe die Logs mit `make logs`
3. Stelle sicher, dass alle Voraussetzungen installiert sind
4. Überprüfe, ob die Docker-Dienste ordnungsgemäß laufen
