import { Component } from '@angular/core';
import { Transaction } from "../../models/transaction";
import { UserService } from "../../services/user.service";
import { DatePipe, NgClass, NgForOf, NgIf } from "@angular/common";
import {FormsModule} from "@angular/forms";
import {LoadingSpinnerComponent} from "../../components/loading-spinner/loading-spinner.component";

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-transactions',
  standalone: true,
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  imports: [
    NgClass,
    NgForOf,
    NgIf,
    DatePipe,
    FormsModule,
    LoadingSpinnerComponent
  ]
})
export class TransactionsComponent {
  allTransactions: Transaction[] = [];
  displayedTransactions: Transaction[] = [];

  displayedGroupedTransactions: { [key: string]: Transaction[] } = {};
  displayedGroupedMonths: string[] = [];

  pageSize = 15;
  currentPage = 1;
  totalPages = 0;

  loading = true;

  categories: string[] = [];
  selectedCategory: string = '';

  constructor(private userService: UserService) {
    this.userService.getSelfTransactions().subscribe({
      next: (transactions) => {
        this.loading = false;
        if (transactions?.length) {
          this.allTransactions = transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          this.totalPages = Math.ceil(this.allTransactions.length / this.pageSize);
          this.loadPage(1);

          this.categories = Array.from(new Set(this.allTransactions.map(tx => tx.category))).sort();
        }
      }
    });
  }

  loadPage(page: number | string) {
    page = Number(page);
    if (page < 1 || page > this.totalPages) return;

    this.currentPage = page;

    const filteredTransactions = this.selectedCategory
      ? this.allTransactions.filter(tx => tx.category === this.selectedCategory)
      : this.allTransactions;

    this.totalPages = Math.ceil(filteredTransactions.length / this.pageSize);

    const startIndex = (page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    this.displayedTransactions = filteredTransactions.slice(startIndex, endIndex);
    this.displayedGroupedTransactions = this.groupTransactionsByMonth(this.displayedTransactions);
    this.displayedGroupedMonths = Object.keys(this.displayedGroupedTransactions);
  }

  onCategoryChange(newCategory: string) {
    this.selectedCategory = newCategory;
    this.loadPage(1);
  }

  groupTransactionsByMonth(transactions: Transaction[]): { [key: string]: Transaction[] } {
    const grouped: { [key: string]: Transaction[] } = {};

    transactions.forEach(tx => {
      const date = new Date(tx.date);
      const monthYear = date.toLocaleString('de-DE', { month: 'long', year: 'numeric' });

      if (!grouped[monthYear]) {
        grouped[monthYear] = [];
      }

      grouped[monthYear].push(tx);
    });

    return grouped;
  }

  get compactPageNumbers(): (number | string)[] {
    const pages: (number | string)[] = [];

    if (this.totalPages <= 7) {
      return Array(this.totalPages).fill(0).map((_, i) => i + 1);
    }

    const nearStart = this.currentPage <= 4;
    const nearEnd = this.currentPage >= this.totalPages - 3;

    if (nearStart) {
      pages.push(1, 2, 3, 4, 5, '...', this.totalPages);
    } else if (nearEnd) {
      pages.push(1, '...', this.totalPages - 4, this.totalPages - 3, this.totalPages - 2, this.totalPages - 1, this.totalPages);
    } else {
      pages.push(1, '...', this.currentPage - 1, this.currentPage, this.currentPage + 1, '...', this.totalPages);
    }

    return pages;
  }

  exportTableToPdf() {
    const transactionsToExport = this.selectedCategory
      ? this.allTransactions.filter(tx => tx.category === this.selectedCategory)
      : this.allTransactions;

    if (transactionsToExport.length === 0) {
      alert('No transactions to export for the selected category.');
      return;
    }

    const doc = new jsPDF();
    const title = this.selectedCategory
      ? `\"${this.selectedCategory}\" Transaktionen`
      : 'Alle Transaktionen';
    const details = `Benutzername: ${this.userService.myUser?.username}\nAktueller Kontostand: ${this.userService.myBalance.toLocaleString("de-DE")} MateCoins\nDatum des Exports: ${new Date().toLocaleDateString('de-DE')}\n`;

    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(20);
    doc.text(title, 14, 15);

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(15);
    doc.text(details, 14, 25);

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(12);

    const head = [['Datum', 'Beschreibung', 'Betrag (MateCoins)', 'Kategorie']];

    const body = transactionsToExport.map(tx => [
      new Date(tx.date).toLocaleString('de-DE'),
      tx.description,
      tx.amount.toLocaleString('de-DE'),
      tx.category
    ]);

    autoTable(doc, {
      head: head,
      body: body,
      startY: 45,
      headStyles: { fillColor: [38, 38, 38] },
    });

    const fileName = this.selectedCategory
      ? `transaktionen-${this.selectedCategory.toLowerCase()}-${this.getFilenameSafeDateTimeFromLocale(new Date())}.pdf`
      : `transaktionen-${this.getFilenameSafeDateTimeFromLocale(new Date())}.pdf`;

    doc.save(fileName);
  }

  getFilenameSafeDateTimeFromLocale(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };

    const localeString = date.toLocaleString("de-DE", options);

    const parts = localeString.match(/\d+/g);

    if (!parts || parts.length !== 6) {
      console.warn("Could not parse date parts correctly from locale string:", localeString);

      return date.toISOString().replace(/[:.-Z]/g, '').slice(0, 14);
    }

    const day = parts[0];
    const month = parts[1];
    const year = parts[2];
    const hour = parts[3];
    const minute = parts[4];
    const second = parts[5];

    return `${year}-${month}-${day}_${hour}${minute}${second}`;
  }
}
