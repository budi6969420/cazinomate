import { Component } from '@angular/core';
import {Transaction} from "../../models/transaction";
import {DatePipe, NgClass, NgForOf} from "@angular/common";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  imports: [
    NgClass,
    NgForOf,
    DatePipe
  ],
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent {
  transactions: Transaction[] = [];

  protected groupedTransactions: { [key: string]: Transaction[] } = {};
  protected groupedMonths: string[] = [];

  constructor(userService: UserService) {
    userService.getSelfTransactions().subscribe({
      next: (transactions) => {
        if (transactions && transactions.length > 0) {
          this.groupedTransactions = this.groupTransactionsByMonth(transactions);
          this.groupedMonths = Object.keys(this.groupedTransactions);
        }
      }
    });
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
}
