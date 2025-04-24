import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForOf, NgIf } from "@angular/common";
import { GameMetadataService } from "../../services/game-metadata.service";
import { GameMetadata } from "../../models/gameMetadata";
import { RouterLink } from "@angular/router";
import { Subscription } from 'rxjs';
import {GameTileComponent} from "../../atoms/game-tile/game-tile.component";

@Component({
  selector: 'app-game-overview',
  standalone: true,
  imports: [
    RouterLink,
    GameTileComponent
  ],
  templateUrl: './game-overview.component.html',
  styleUrl: './game-overview.component.scss'
})
export class GameOverviewComponent implements OnInit{
  @ViewChild("searchInput") searchInput!: ElementRef;
  filteredGames: GameMetadata[] = []
  dataLoadedSubscription: Subscription | null = null;

  constructor(protected gameMetadataService: GameMetadataService) {
  }

  ngOnInit(): void {
    this.dataLoadedSubscription = this.gameMetadataService.dataLoaded$.subscribe(
      (loadedMetadatas) => {
        this.filteredGames = [...loadedMetadatas];
      }
    );
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
