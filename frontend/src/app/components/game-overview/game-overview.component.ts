import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {GameMetadataService} from "../../services/game-metadata.service";
import {GameMetadata} from "../../models/gameMetadata";

@Component({
  selector: 'app-game-overview',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './game-overview.component.html',
  styleUrl: './game-overview.component.scss'
})
export class GameOverviewComponent {
  @ViewChild("searchInput") searchInput!: ElementRef;
  games!: GameMetadata[];
  filteredGames!: GameMetadata[];

  constructor(private service: GameMetadataService) {
    this.service.getGameMatadatas().subscribe({
      next: (games) => {
          this.games = games;
          this.filteredGames = games;
      },
      error: () => {
        console.log("Could not load games.")
      }
    });
  }

  filterGames(): void {
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
    this.filterGames();
  }
}
