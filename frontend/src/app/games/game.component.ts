import { Component, OnInit, ElementRef, OnDestroy, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { GameAsset } from "../models/gameAsset"; // Assuming GameAsset has { alias: string, src: string }
import * as PIXI from 'pixi.js';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {

  @Input() assetsToLoad: GameAsset[] = [];
  @Output() loadingProgressUpdate = new EventEmitter<number>();
  @Output() gameReady = new EventEmitter<PIXI.Application>();

  private app: PIXI.Application | undefined;
  private readonly APP_LOGICAL_WIDTH = 1500;
  private readonly APP_LOGICAL_HEIGHT = 1000;

  private stageContainer!: PIXI.Container<any>;
  private resizeHandler!: () => void;

  constructor(private elementRef: ElementRef<HTMLElement>) { }

  async ngOnInit() {
    this.app = new PIXI.Application();
    await this.app.init({
      background: '#1099bb',
      resizeTo: this.elementRef.nativeElement,
      autoDensity: true
    });

    this.elementRef.nativeElement.appendChild(this.app.canvas);
    this.stageContainer = new PIXI.Container();
    this.app.stage.addChild(this.stageContainer);

    this.resizeHandler = this.resizeAndPositionStage.bind(this);
    //@ts-ignore
    this.app.renderer.on('resize', this.resizeHandler);
    this.resizeAndPositionStage();

    let asset: GameAsset = new GameAsset(
      "test",
      "/images/game-assets/crossy-road/SampleJPGImage_1mbmb.jpg"
    );
    let asset2: GameAsset = new GameAsset(
      "test2",
      "/images/game-assets/crossy-road/SampleJPGImage_2mbmb.jpg"
    );
    let asset3: GameAsset = new GameAsset(
      "test3",
      "/images/game-assets/crossy-road/SampleJPGImage_5mbmb.jpg"
    );
    let asset4: GameAsset = new GameAsset(
      "test4",
      "/images/game-assets/crossy-road/Sample-jpg-image-10mb.jpg"
    );

    this.assetsToLoad.push(asset, asset2, asset3, asset4);
    await this.loadAssets();
  }

  private resizeAndPositionStage(): void {
    if (!this.app || !this.stageContainer) return;

    const screenWidth = this.app.screen.width;
    const screenHeight = this.app.screen.height;
    const scale = Math.min(screenWidth / this.APP_LOGICAL_WIDTH, screenHeight / this.APP_LOGICAL_HEIGHT);

    this.stageContainer.scale.set(scale);
    this.stageContainer.x = (screenWidth - (this.APP_LOGICAL_WIDTH * scale)) / 2;
    this.stageContainer.y = (screenHeight - (this.APP_LOGICAL_HEIGHT * scale)) / 2;
  }

  private async loadAssets(): Promise<void> {
    if (this.assetsToLoad.length > 0) {
      try {
        for (const asset of this.assetsToLoad) {
          PIXI.Assets.add(asset);
        }

        const loadedAssets = await PIXI.Assets.load(
          this.assetsToLoad.map(a => a.alias),
          (progress) => {
            const percentage = Math.round(progress * 100);
            this.loadingProgressUpdate.emit(percentage);
          }
        );

        console.log('Assets loaded successfully.');
        if (this.app) {
          this.gameReady.emit(this.app);
          this.setupGameScene();
        }

      } catch (error) {
        console.error("Error loading assets:", error);
      }
    } else {
      console.log('No assets to load.');
      this.loadingProgressUpdate.emit(100);
      if (this.app) {
        this.gameReady.emit(this.app);
        this.setupGameScene();
      }
    }
  }

  private setupGameScene(): void {
    if (!this.stageContainer || !this.app) return;

    // Example: Add a sprite to the scaled stageContainer
    // Its dimensions and position are relative to LOGICAL_WIDTH and LOGICAL_HEIGHT
    try {
      const testSprite = PIXI.Sprite.from("test");
      testSprite.width = 150;
      testSprite.height = 100;

      testSprite.x = 0;
      testSprite.y = 0;

      this.stageContainer.addChild(testSprite);
      console.log("Test sprite added to stageContainer.");

    } catch (error) {
      console.error("Error creating sprite from 'test'. Is the asset loaded correctly?", error);
    }
  }

  ngOnDestroy() {
    console.log("GameComponent ngOnDestroy: Cleaning up PIXI.");

    if (this.app && this.resizeHandler) {
      //@ts-ignore
      this.app.renderer.off('resize', this.resizeHandler);
    }

    if (this.assetsToLoad.length > 0) {
      PIXI.Assets.unload(this.assetsToLoad.map(a => a.alias))
        .then(() => console.log("Assets unloaded."))
        .catch(err => console.warn("Error during asset unload:", err));
    }

    if (this.app) {
      this.app.destroy(true, { children: true, texture: true });
      this.app = undefined;
      console.log("PIXI Application destroyed.");
    }

    this.assetsToLoad = [];
  }
}
