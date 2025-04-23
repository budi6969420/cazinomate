import { Component, AfterViewInit } from '@angular/core';
import * as CookieConsent from 'vanilla-cookieconsent';

@Component({
  selector: 'cookie-consent-component',
  templateUrl: './cookie-consent.component.html',
  standalone: true,
  styleUrls: ['./cookie-consent.component.css']
})
export class CookieConsentComponent implements AfterViewInit {
  ngAfterViewInit(): void {

    document.documentElement.classList.add('cc--darkmode');

    CookieConsent.run({
      onFirstConsent: ({ cookie }) => {
        console.log('Erste Cookie-Zustimmung erteilt:', cookie);
      },

      onConsent: ({ cookie }) => {
        console.log('Cookie-Einstellungen aktualisiert:', cookie);
      },

      onChange: ({ changedCategories, changedServices }) => {
        console.log('Cookie-Präferenzen geändert:', changedCategories, changedServices);
      },

      categories: {
        necessary: {
          enabled: true,
          readOnly: true,
        },
        analytics: {
          autoClear: {
            cookies: [
              { name: /^_ga/ },
              { name: '_gid' },
            ],
          },
          services: {
            analyticsService: {
              label: 'Nutzungsstatistiken (Google Analytics)',
              onAccept: () => console.log('Analytics akzeptiert'),
              onReject: () => console.log('Analytics abgelehnt'),
            },
          },
        },
        ads: {
          services: {
            personalizedAds: {
              label: 'Personalisierte Inhalte',
              onAccept: () => console.log('Personalisierte Inhalte akzeptiert'),
              onReject: () => console.log('Personalisierte Inhalte abgelehnt'),
            },
          },
        },
      },
      guiOptions: {
        consentModal: {
          layout: 'cloud inline',
          position: 'bottom center'
        }
      },
      language: {
        default: 'de',
        translations: {
          de: {
            consentModal: {
              title: 'Cookie-Einstellungen bei Cazinomate',
              description: 'Wir verwenden Cookies, um Ihnen das beste Spielerlebnis zu bieten. Dazu gehören notwendige Cookies, die für den Betrieb erforderlich sind, sowie optionale Cookies für Statistik und personalisierte Inhalte.',
              acceptAllBtn: 'Alle akzeptieren',
              acceptNecessaryBtn: 'Nur notwendige',
              showPreferencesBtn: 'Einstellungen anpassen',
              footer: `
            <a href="#impressum">Impressum</a>
            <a href="#datenschutz">Datenschutzerklärung</a>
          `,
            },
            preferencesModal: {
              title: 'Datenschutzeinstellungen',
              acceptAllBtn: 'Alle akzeptieren',
              acceptNecessaryBtn: 'Nur notwendige',
              savePreferencesBtn: 'Auswahl speichern',
              closeIconLabel: 'Fenster schließen',
              sections: [
                {
                  title: 'Datenschutz bei Cazinomate',
                  description: `
                In diesem Bereich können Sie festlegen, welche Cookies wir verwenden dürfen.
                Sie können Ihre Einstellungen jederzeit anpassen.
                Bitte beachten Sie, dass Cazinomate ein reines Test- und Spielprojekt ist – es gibt keine Auszahlungen oder Echtgeld-Gewinne.
              `,
                },
                {
                  title: 'Unverzichtbare Cookies',
                  description: 'Diese Cookies sind erforderlich, damit die Webseite funktioniert und können nicht deaktiviert werden.',
                  linkedCategory: 'necessary',
                },
                {
                  title: 'Statistik & Analyse',
                  description: 'Wir erfassen anonyme Daten, um unser Angebot stetig zu verbessern. Diese Cookies helfen uns zu verstehen, welche Inhalte besonders beliebt sind.',
                  linkedCategory: 'analytics',
                  cookieTable: {
                    caption: 'Übersicht der Statistik-Cookies',
                    headers: {
                      name: 'Cookie',
                      domain: 'Domain',
                      desc: 'Beschreibung',
                    },
                    body: [
                      {
                        name: '_ga',
                        domain: window.location.hostname,
                        desc: 'Wird verwendet, um Besucherstatistiken zu erfassen.',
                      },
                      {
                        name: '_gid',
                        domain: window.location.hostname,
                        desc: 'Kurzfristige Statistik zur Nutzererkennung.',
                      },
                    ],
                  },
                },
                {
                  title: 'Personalisierte Inhalte',
                  description: 'Wir möchten Ihnen Inhalte und Spiele anzeigen, die zu Ihren Interessen passen. Diese Cookies helfen uns dabei.',
                  linkedCategory: 'ads',
                },
                {
                  title: 'Weitere Informationen',
                  description: 'Mehr Informationen zum Datenschutz finden Sie in unserer <a href="#datenschutz">Datenschutzerklärung</a>.',
                },
              ],
            },
          },
        },
      },
    });


  }
}
