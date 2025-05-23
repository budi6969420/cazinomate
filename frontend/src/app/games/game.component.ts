import { Component, OnInit, ElementRef, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Assets, Application, Container, Sprite } from 'pixi.js';
import { GameManifest, GameManifestBundle, GameManifestBundleAsset } from '../models/game/gameManifest'; // Ensure GameManifestBundleAsset defines 'name: string' if you extract names
import { GameMetadata } from "../models/gameMetadata";
import { IGameLogic } from "./game-logic/iGameLogic";
import { CrossyRoadGame } from "./game-logic/crossy-road/crossyRoadGame";

const KnownGameIds = {
  CROSSY_ROAD: "39c63177-b7ad-478b-a009-69b8fa043e6f"
} as const;

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {

  @Input() gameMetaData!: GameMetadata;

  @Output() loadingProgressUpdate = new EventEmitter<number>();
  @Output() gameReady = new EventEmitter<Application>();

  private gameLogic!: IGameLogic;

  private app?: Application;
  private stageContainer!: Container<any>;

  private loadedManifest?: GameManifest;
  private assetIdentifiers: string[] = [];

  private readonly APP_LOGICAL_WIDTH: number = 2770;
  private readonly APP_LOGICAL_HEIGHT: number = 2000;

  private readonly GAME_ASSETS_ROOT_PATH = "/game-assets/";
  private currentGameSpecificAssetPath!: string;
  private currentManifestUrl!: string;

  constructor(private elementRef: ElementRef<HTMLElement>) { }

  async ngOnInit(): Promise<void> {
    if (!this.gameMetaData) {
      console.error("Game metadata is not available. Cannot initialize game.");
      return;
    }

    try {
      this.gameLogic = this.createGameLogic(this.gameMetaData.id);
      this.configurePaths();

      await this.fetchAndProcessManifest();

      if (!this.loadedManifest) {
        console.error("Manifest is not available. Cannot initialize PIXI.Assets.");
        return;
      }

      await this.initializePixiAssets();
      await this.initializePixiApplication();
      this.setupStage();
      await this.loadAssetsFromManifest();

    } catch (error) {
      console.error('Critical error during GameComponent initialization:', error);
      this.loadingProgressUpdate.emit(100);
    }
  }

  private createGameLogic(gameId: string): IGameLogic {
    switch (gameId) {
      case KnownGameIds.CROSSY_ROAD:
        return new CrossyRoadGame(this.APP_LOGICAL_HEIGHT, this.APP_LOGICAL_WIDTH);
      default:
        throw new Error(`Unsupported game ID: ${gameId}. Cannot create game logic.`);
    }
  }

  private configurePaths(): void {
    if (!this.gameLogic) {
      throw new Error("Game logic must be initialized before configuring paths.");
    }
    const gameName = this.gameLogic.getName(); // Assumes IGameLogic has getName()
    this.currentGameSpecificAssetPath = `${this.GAME_ASSETS_ROOT_PATH}${gameName}/`;
    this.currentManifestUrl = `${this.currentGameSpecificAssetPath}manifest.json`;
  }

  private async fetchAndProcessManifest(): Promise<void> {
    try {
      const response = await fetch(this.currentManifestUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch manifest from ${this.currentManifestUrl}: ${response.status} ${response.statusText}`);
      }
      this.loadedManifest = await response.json() as GameManifest;
      console.log('Manifest loaded successfully from:', this.currentManifestUrl, this.loadedManifest);
      this.extractAssetIdentifiersFromLoadedManifest();
    } catch (error) {
      console.error(`Error loading or processing manifest from ${this.currentManifestUrl}:`, error);
      this.loadedManifest = undefined;
      throw error;
    }
  }

  private extractAssetIdentifiersFromLoadedManifest(): void {
    if (!this.loadedManifest?.bundles) {
      this.assetIdentifiers = [];
      return;
    }

    this.assetIdentifiers = this.loadedManifest.bundles.flatMap(
        bundle => bundle.assets?.map(asset => asset['alias']).filter(Boolean) as string[] || []
    );
  }

  private async initializePixiAssets(): Promise<void> {
    if (!this.loadedManifest) {
      throw new Error("Cannot initialize PIXI.Assets: Manifest not loaded.");
    }
    await Assets.init({
      manifest: this.loadedManifest,
      basePath: this.currentGameSpecificAssetPath
    });
    console.log('PIXI.Assets initialized. Base path:', this.currentGameSpecificAssetPath);
  }

  private async initializePixiApplication(): Promise<void> {
    this.app = new Application();
    await this.app.init({
      background: '#1099bb',
      width: this.APP_LOGICAL_WIDTH,
      height: this.APP_LOGICAL_HEIGHT,
      antialias: true,
      autoDensity: true,
    });

    this.app.canvas.style.width = '100%';
    this.app.canvas.style.height = '100%';

    this.elementRef.nativeElement.appendChild(this.app.canvas);
    console.log('PIXI.Application initialized and canvas appended.');
  }

  private setupStage(): void {
    if (!this.app) {
      console.error("PIXI Application not initialized. Cannot setup stage.");
      return;
    }
    this.stageContainer = new Container();

    this.gameLogic.setStage(this.stageContainer);
    this.app.stage.addChild(this.stageContainer);
  }

  private async loadAssetsFromManifest(): Promise<void> {
    if (!this.loadedManifest || !this.app) {
      console.warn('Manifest or PIXI App not ready for loading assets. Skipping.');
      this.loadingProgressUpdate.emit(100);
      if (this.app) this.gameReady.emit(this.app);
      return;
    }

    try {
      const bundles = this.loadedManifest.bundles;
      if (!bundles || bundles.length === 0) {
        console.log('No bundles found in the manifest to load.');
        this.loadingProgressUpdate.emit(100);
        this.gameReady.emit(this.app);
        this.gameLogic.start();
        return;
      }

      const bundleNamesToLoad = bundles.map(bundle => bundle.name);
      if (bundleNamesToLoad.length === 0) {
        console.log('No valid bundle names found in the manifest to load.');
        this.loadingProgressUpdate.emit(100);
        this.gameReady.emit(this.app);
        this.gameLogic.start();
        return;
      }

      console.log(`Starting to load bundles: ${bundleNamesToLoad.join(', ')}...`);
      this.loadingProgressUpdate.emit(0);

      await Assets.loadBundle(bundleNamesToLoad, (progress) => {
        const percentage = Math.round(progress * 100);
        this.loadingProgressUpdate.emit(percentage);
      });

      console.log(`Bundles '${bundleNamesToLoad.join(', ')}' loaded successfully!`);
      this.loadingProgressUpdate.emit(100);
      this.gameLogic.start();
      this.gameReady.emit(this.app);

    } catch (error) {
      console.error('Error loading assets from manifest:', error);
      this.loadingProgressUpdate.emit(100);
      if (this.app) this.gameReady.emit(this.app);
    }
  }


  ngOnDestroy(): void {
    console.log("GameComponent ngOnDestroy: Cleaning up PIXI resources.");

    // Unload assets identified by their names/aliases
    if (this.assetIdentifiers.length > 0) {
      Assets.unload(this.assetIdentifiers)
          .then(() => console.log("Assets unloaded based on collected identifiers:", this.assetIdentifiers))
          .catch(err => console.warn("Error during asset unload:", err));
    }
    this.assetIdentifiers = [];

    if (this.loadedManifest) {
      this.loadedManifest = undefined;
    }

    if (this.app) {
      this.app.destroy(true, { children: true, texture: true });
      this.app = undefined;
      console.log("PIXI Application destroyed.");
    }
  }
}
