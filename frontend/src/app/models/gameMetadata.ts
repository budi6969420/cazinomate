import {HeaderedText} from "./headeredText";

export interface GameMetadata {
  id: string;
  title: string;
  description: HeaderedText[];
  lovelyDescriptionMessage: string;
  previewImageUrl: string;
  loadingIconUrl: string;
  previewHexColor: string;
  playable: boolean;
}
