import { Component } from '@angular/core';
import { Transaction } from "../../models/transaction";
import { UserService } from "../../services/user.service";
import { DatePipe, NgClass, NgForOf, NgIf } from "@angular/common";
import {FormsModule} from "@angular/forms";
import {LoadingSpinnerComponent} from "../../components/loading-spinner/loading-spinner.component";

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
}
