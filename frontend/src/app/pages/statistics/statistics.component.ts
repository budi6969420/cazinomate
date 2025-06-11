import { Component, OnInit } from '@angular/core';
import { CurrencyPipe, DecimalPipe, TitleCasePipe } from '@angular/common';
import { GameStatistics } from '../../models/GameStatistics';
import { StatisticsService } from '../../services/statistics.service';
import { catchError, of, take } from 'rxjs';
import { LoadingSpinnerComponent } from "../../components/loading-spinner/loading-spinner.component";
import { GameMetadataService } from '../../services/game-metadata.service';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [
    DecimalPipe,
    TitleCasePipe,
    LoadingSpinnerComponent,
  ],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss'
})
export class StatisticsComponent implements OnInit {
  gameStats: GameStatistics[] = [];
  totalOverallGamesPlayed: number = 0;
  totalOverallGamesWon: number = 0;
  overallWinRate: number = 0;
  totalOverallAmountInvested: number = 0;
  totalOverallAmountWon: number = 0;
  overallROI: number = 0;

  currentView: 'global' | 'self' = 'global';
  isLoading: boolean = false;
  errorMessage: string | null = null;

  private gameDisplayNameMap: Map<string, string> = new Map();

  constructor(
    private statisticsService: StatisticsService,
    private gameMetadataService: GameMetadataService
  ) { }

  ngOnInit(): void {
    this.gameMetadataService.dataLoaded$.pipe(
      take(1)
    ).subscribe(gameMetadatas => {
      gameMetadatas.forEach(metadata => {
        this.gameDisplayNameMap.set(metadata.id, metadata.title);
      });
      this.loadStatistics();
    });
  }

  loadStatistics(): void {
    this.isLoading = true;
    this.errorMessage = null;

    let statsObservable;

    if (this.currentView === 'global') {
      statsObservable = this.statisticsService.getGlobalGameStatistics();
    } else {
      statsObservable = this.statisticsService.getSelfGameStatistics().pipe(
        catchError(error => {
          console.error('Error fetching user statistics:', error);
          this.gameStats = [];
          this.calculateOverallStatistics();
          this.isLoading = false;
          return of([]);
        })
      );
    }

    statsObservable.subscribe({
      next: data => {
        this.gameStats = data.map(stat => ({
          ...stat,
          gameId: this.gameDisplayNameMap.get(stat.gameId) || stat.gameId
        }));
        this.calculateOverallStatistics();
        this.isLoading = false;
      },
      error: err => {
        if (!this.errorMessage) {
          this.errorMessage = 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es später erneut.';
        }
        console.error('General statistics loading error:', err);
        this.gameStats = [];
        this.calculateOverallStatistics();
        this.isLoading = false;
      }
    });
  }

  switchView(view: 'global' | 'self'): void {
    if (this.currentView !== view) {
      this.currentView = view;
      this.loadStatistics();
    }
  }

  calculateOverallStatistics(): void {
    this.totalOverallGamesPlayed = this.gameStats.reduce((sum, stat) => sum + stat.totalGamesPlayed, 0);
    this.totalOverallGamesWon = this.gameStats.reduce((sum, stat) => sum + stat.totalGamesWon, 0);
    this.totalOverallAmountInvested = this.gameStats.reduce((sum, stat) => sum + stat.amountInvested, 0);
    this.totalOverallAmountWon = this.gameStats.reduce((sum, stat) => sum + stat.amountWon, 0);

    this.overallWinRate = this.totalOverallGamesPlayed > 0
      ? (this.totalOverallGamesWon / this.totalOverallGamesPlayed) * 100
      : 0;

    this.overallROI = this.totalOverallAmountInvested > 0
      ? ((this.totalOverallAmountWon - this.totalOverallAmountInvested) / this.totalOverallAmountInvested) * 100
      : 0;
  }

  getWinRate(stat: GameStatistics): number {
    return stat.totalGamesPlayed > 0
      ? (stat.totalGamesWon / stat.totalGamesPlayed) * 100
      : 0;
  }

  getROI(stat: GameStatistics): number {
    return stat.amountInvested > 0
      ? ((stat.amountWon - stat.amountInvested) / stat.amountInvested) * 100
      : 0;
  }
}
