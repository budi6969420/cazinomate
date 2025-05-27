# CasinoMate Loading Page

Eine moderne Service-Status-Dashboard für CasinoMate, gebaut mit Next.js und Tailwind CSS.

## Features

- **Modernes UI Design** mit dunklem Farbschema, passend zum Casino-Thema
- **Echtzeit-Service-Überwachung** für Keycloak, Backend und Frontend
- **Responsive Design** - funktioniert auf allen Geräten
- **Automatische Aktualisierung** der Servicezustände
- **Hilfreiche Fehlerbehandlung** mit Anzeige von Verbindungsversuchen

## Technologien

- [Next.js](https://nextjs.org/) - React Framework
- [TypeScript](https://www.typescriptlang.org/) - Type-sicheres JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-First CSS Framework
- [React](https://reactjs.org/) - Frontend Library

## Entwicklung

Um das Projekt lokal zu starten:

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Die Anwendung ist dann unter [http://localhost:3000](http://localhost:3000) erreichbar.

## Integration

Diese Loading-Page wird automatisch beim Ausführen von `make start` gestartet und zeigt den Status aller CasinoMate-Dienste an.

## Anpassung

Die UI kann leicht über die Tailwind-Klassen in den Komponenten angepasst werden. Die Farbpalette ist in der `tailwind.config.js` definiert und enthält bereits Casino-Themed-Farben (Gold, Schwarz, Rot).

## Lizenz

Internes Projekt - Alle Rechte vorbehalten 