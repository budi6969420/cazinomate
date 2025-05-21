export interface GameManifestBundleAsset {
  alias: string;
  src: string;
  [key: string]: any;
}
export interface GameManifestBundle {
  name: string;
  assets: GameManifestBundleAsset[];
}
export interface GameManifest {
  bundles: GameManifestBundle[];
  [key: string]: any;
}
