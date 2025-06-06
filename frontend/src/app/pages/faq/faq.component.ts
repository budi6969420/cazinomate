import { Component } from '@angular/core';
import {FAQModel} from "../../models/faqModel";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-faq',
  imports: [
    NgForOf
  ],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent {

  questions = [
    {
      question: 'Wie funktioniert das Spielen auf CazinoMate?',
      answer: 'Nachdem du dich registriert und eingeloggt hast, kannst du Coins einzahlen und an unseren Spielen teilnehmen. Gewinne werden deinem Konto gutgeschrieben und können später ausgezahlt werden.'
    },
    {
      question: 'Welche Zahlungsmethoden kann ich verwenden?',
      answer: 'Wir akzeptieren Zahlungen per Kreditkarte, Klarna, Bancontact sowie eps-Überweisung.'
    },
    {
      question: 'Was sind MateCoins und wie funktionieren sie?',
      answer: 'MateCoins sind unsere virtuelle Währung auf der Plattform. Du kannst sie kaufen, bei Spielen einsetzen und gegen Prämien eintauschen.'
    },
    {
      question: 'Ich habe mein Passwort vergessen. Was kann ich tun?',
      answer: 'Nutze die „Passwort vergessen“-Funktion auf der Login-Seite. Du erhältst per E-Mail einen Link zum Zurücksetzen deines Passworts.'
    },
    {
      question: 'Kann ich auch mobil spielen?',
      answer: 'Nein, unsere Seite ist noch nicht für mobile Geräte optimiert. Allerdings arbeiten wir derzeit daran.'
    },
    {
      question: 'Gibt es eine Altersbeschränkung?',
      answer: 'Ja, die Nutzung unserer Plattform ist nur für Personen ab 18 Jahren erlaubt.'
    },
    {
      question: 'Gibt es eine App für CazinoMate?',
      answer: 'Aktuell leider nicht, aber wir ziehen es in Betracht, eine App zu entwickeln.'
    },
    {
      question: 'Welche Browser werden unterstützt?',
      answer: 'Unsere Seite funktioniert am besten mit den neuesten Versionen von Chrome, Firefox, Safari oder Brave.'
    },
    {
      question: 'Wie kann man als Obdachloser bei Cazino spielen?',
      answer: 'Ganz einfach: Du brauchst nur einen Internetzugang und ein Endgerät! Bei CazinoMate kannst du von überall aus spielen, solange du eine Verbindung hast. Keine Barrieren, keine Vorurteile.'
    },
    {
      question: 'Was mache ich, wenn ich kein Geld mehr zur Verfügung habe?',
      answer: 'Dann nimm dir eine Pause! Unsere Spiele sind rund um die Uhr verfügbar, also kannst du jederzeit zurückkommen.'
    },
    {
      question: 'Ich bin hungrig, wird CazinoMate meine Probleme lösen und meine Lebensansicht verbessern?',
      answer: 'Ja.'
    },
    {
      question: 'Was sind MateCoins?',
      answer: 'MateCoins sind die Währung bei CazinoMate! Sie sind der Schlüssel zu allem, was wir zu bieten haben. Gewinne sammeln und tolle Gutscheine für alkoholische Produkte einlösen. Einfacher geht’s nicht! Aber keine Sorge, du brauchst keinen physischen Mate – nur ein gutes Gespür für Glück!'
    },
    {
      question: 'Wie kann ich mit CazinoMate kollaborieren?',
      answer: 'Wir sind immer offen für kreative Ideen! Wenn du ein Partner oder Influencer bist, der unser Casino feiern möchte, dann melde dich bei uns. Wir lieben es, mit Menschen zusammenzuarbeiten, die genauso viel Spaß an Cazino haben wie wir!'
    },
    {
      question: 'Ich habe zu viel gewonnen. Wie kann ich damit umgehen?',
      answer: 'Herzlichen Glückwunsch! Aber keine Sorge, bei uns gibt’s keine baren Auszahlungen. Stattdessen bekommst du Gutscheine für alkoholische Produkte – so kannst du mit deinen Gewinnen entspannt ein Feierabend-Bier genießen.'
    }
  ];



  openQuestionIndex: number | null = null;

  toggleAnswer(index: number) {
    this.openQuestionIndex = this.openQuestionIndex === index ? null : index;
  }
}
