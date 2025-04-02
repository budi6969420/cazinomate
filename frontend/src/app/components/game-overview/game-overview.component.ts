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
export class GameOverviewComponent {
  @ViewChild("searchInput") searchInput!: ElementRef;
  filteredGames: GameMetadata[] = []

  constructor(private gameMetadataService: GameMetadataService) {
    this.filteredGames = this.gameMetadataService.gameMetadatas;
  }

  updateFilteredGames(): void {
    const searchTerm = this.searchInput.nativeElement.value.toLowerCase();
    if (searchTerm) {
      this.filteredGames = this.gameMetadataService.gameMetadatas.filter(game =>
        game.title.toLowerCase().includes(searchTerm)
      );
    } else {
      this.filteredGames = [...this.gameMetadataService.gameMetadatas];
    }
  }

  clearSearchInput(): void {
    this.searchInput.nativeElement.value = '';
    this.updateFilteredGames();
  }
}
