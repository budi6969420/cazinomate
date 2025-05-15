import { Component, OnInit, AfterViewInit, ElementRef, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import {GameAsset} from "../models/gameAsset";
import * as PIXI from 'pixi.js';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() assetsToLoad: GameAsset[] = [];
  @Output() loadingProgressUpdate = new EventEmitter<number>();
  @Output() gameReady = new EventEmitter<PIXI.Application>();

  private app: PIXI.Application | undefined;
  private readonly BUNDLE_NAME = 'gameAssets'; // Name for the asset bundle

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  async ngOnInit() {

    let asset: GameAsset = new GameAsset(
      "test",
      "/images/game-assets/crossy-road/SampleJPGImage_1mbmb.jpg"
    )
    let asset2: GameAsset = new GameAsset(
      "test2",
      "/images/game-assets/crossy-road/SampleJPGImage_2mbmb.jpg"
    )
    let asset3: GameAsset = new GameAsset(
      "test3",
      "/images/game-assets/crossy-road/SampleJPGImage_5mbmb.jpg"
    )
    let asset4: GameAsset = new GameAsset(
      "test4",
      "/images/game-assets/crossy-road/Sample-jpg-image-10mb.jpg"
    )

    this.assetsToLoad.push(asset);
    this.assetsToLoad.push(asset2);
    this.assetsToLoad.push(asset3);
    this.assetsToLoad.push(asset4);



    this.app = new PIXI.Application();
    this.app.init({
      background: '#1099bb',
      resizeTo: this.elementRef.nativeElement
    })
    await this.loadAssets();

    //TODO FIGURE OUT HOW TO SCALE SPRITES AND CONTAINERS RELATIVE TO GAME WINDOW - https://jsfiddle.net/2wjw043f/
    let test = PIXI.Sprite.from("test")
    test.height = 100;
    this.app.stage.addChild(test);

    console.log("Height: " + this.app?.canvas.height);
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
            console.log('Loading progress:', percentage, '%');
          }
        );

        console.log('Assets loaded successfully:', loadedAssets);
        if (this.app) {
          this.gameReady.emit(this.app);
          this.elementRef.nativeElement.appendChild(this.app.canvas)
        }

      } catch (error) {
        console.error("Error loading assets:", error);
      }
    } else {
      this.loadingProgressUpdate.emit(100);
      if (this.app) {
        this.gameReady.emit(this.app);
        this.elementRef.nativeElement.appendChild(this.app.canvas)
      }
    }
  }

  ngAfterViewInit() {
    if (this.app && this.app.view) {
      this.elementRef.nativeElement.appendChild(this.app.view as unknown as Node);
    } else {
      console.error("PIXI Application or view not initialized in ngAfterViewInit.");
    }
  }

  ngOnDestroy() {
    for (const asset of this.assetsToLoad) {
      PIXI.Assets.unload(asset.alias);
    }
  }
}
