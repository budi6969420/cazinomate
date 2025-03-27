import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForOf, NgIf } from "@angular/common";
import { GameMetadataService } from "../../services/game-metadata.service";
import { GameMetadata } from "../../models/gameMetadata";
import { RouterLink } from "@angular/router";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game-overview',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink
  ],
  templateUrl: './game-overview.component.html',
  styleUrl: './game-overview.component.scss'
})
export class GameOverviewComponent implements OnInit, OnDestroy {
  @ViewChild("searchInput") searchInput!: ElementRef;
  games: GameMetadata[] = [];
  filteredGames: GameMetadata[] = [];
  private gameSubscription: Subscription | undefined;

  constructor(private service: GameMetadataService) { }

  ngOnInit(): void {
    this.gameSubscription = this.service.getGameMetadatas().subscribe({
      next: (games) => {
        this.games = games;
        this.filteredGames = [...this.games];
      }
    });
  }

  ngOnDestroy(): void {
    if (this.gameSubscription) {
      this.gameSubscription.unsubscribe();
    }
  }

  updateFilteredGames(): void {
    const searchTerm = this.searchInput.nativeElement.value.toLowerCase();
    if (searchTerm) {
      this.filteredGames = this.games.filter(game =>
        game.title.toLowerCase().includes(searchTerm)
      );
    } else {
      this.filteredGames = [...this.games];
    }
  }

  clearSearchInput(): void {
    this.searchInput.nativeElement.value = '';
    this.updateFilteredGames();
  }
}
