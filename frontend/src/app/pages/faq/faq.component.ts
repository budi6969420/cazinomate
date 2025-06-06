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
    }
  ];



  openQuestionIndex: number | null = null;

  toggleAnswer(index: number) {
    this.openQuestionIndex = this.openQuestionIndex === index ? null : index;
  }
}
