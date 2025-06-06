import { Component, OnInit, ElementRef, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { soundAsset } from '@pixi/sound';
import { Assets, Application, Container, Sprite, extensions } from 'pixi.js';
import { GameManifest, GameManifestBundle, GameManifestBundleAsset } from '../models/game/gameManifest';
import { GameMetadata } from "../models/gameMetadata";
import { IGame } from "./base-game/IGame";
import { CrossyRoadGame } from "./crossy-road/crossyRoadGame";
import { ControlBar } from "./base-game/elements/controlBar";
import {KeycloakAuthService} from "../services/keycloak-auth.service";
import {UserService} from "../services/user.service";
import {GameMetadataService} from "../services/game-metadata.service";
import {GameConstants} from "./gameConstants";

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

  private game!: IGame;
  private controlBar!: ControlBar;

  private app?: Application;

  private loadedManifest?: GameManifest;
  private assetIdentifiers: string[] = [];

  private readonly GAME_ASSETS_ROOT_PATH = "/game-assets/";
  private currentGameSpecificAssetPath!: string;
  private currentManifestUrl!: string;

  constructor(private elementRef: ElementRef<HTMLElement>, private keycloakService: KeycloakAuthService,private userService: UserService, private gameMetadataService: GameMetadataService) { }
  async ngOnInit(): Promise<void> {
    extensions.add(soundAsset)

    if (!this.gameMetaData) {
      console.error("Game metadata is not available. Cannot initialize game.");
      return;
    }

    try {
      this.game = this.createGameLogic(this.gameMetaData.id);
      this.configurePaths();

      await this.fetchAndProcessManifest();

      if (!this.loadedManifest) {
        console.error("Manifest is not available. Cannot initialize PIXI.Assets.");
        return;
      }

      await this.initializePixiAssets();
      await this.initializePixiApplication();
      await this.loadAssetsFromManifest();
      await this.setupStage();

    } catch (error) {
      console.error('Critical error during GameComponent initialization:', error);
      this.loadingProgressUpdate.emit(100);
    }
  }

  private createGameLogic(gameId: string): IGame {
    let game = this.gameMetadataService.getGameObject(gameId);
    if (game) return game;
    throw new Error(`Unsupported game ID: ${gameId}. Cannot create game logic.`);
  }

  private configurePaths(): void {
    if (!this.game) {
      throw new Error("Game logic must be initialized before configuring paths.");
    }
    const gameName = this.game.getName();
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
    Assets.reset();
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
      width: GameConstants.APP_LOGICAL_WIDTH,
      height: GameConstants.APP_LOGICAL_HEIGHT,
      antialias: true,
      autoDensity: true,
    });

    this.app.canvas.style.width = '100%';
    this.app.canvas.style.height = '100%';

    this.elementRef.nativeElement.appendChild(this.app.canvas);
    console.log('PIXI.Application initialized and canvas appended.');
  }

  private async setupStage() {
    if (!this.app) {
      console.error("PIXI Application not initialized. Cannot setup stage.");
      return;
    }

    this.controlBar = new ControlBar(this.game, this.userService, await this.keycloakService.getToken());

    //@ts-ignore
    this.app.stage.addChild(this.game as Container<any>);
    if (this.gameMetaData.playable) {
      this.app!.stage.addChild(this.controlBar)
    }
    await this.controlBar.findAndStartActiveGameSession();

    document.addEventListener('keydown', (event: KeyboardEvent) => {
      this.controlBar.controller(event);
    });
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
        return;
      }

      const bundleNamesToLoad = bundles.map(bundle => bundle.name);
      if (bundleNamesToLoad.length === 0) {
        console.log('No valid bundle names found in the manifest to load.');
        this.loadingProgressUpdate.emit(100);
        this.gameReady.emit(this.app);
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
      this.gameReady.emit(this.app);

    } catch (error) {
      console.error('Error loading assets from manifest:', error);
      this.loadingProgressUpdate.emit(100);
      if (this.app) this.gameReady.emit(this.app);
    }
  }


  ngOnDestroy(): void {
    console.log("GameComponent ngOnDestroy: Cleaning up PIXI resources.");

    this.game.destroy();
    this.controlBar.destroy();

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
