package de.szut.lf8_starter.game;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GameMetadata {
    private String id;
    private String title;
    private HeaderedText[] description;
    private String lovelyDescriptionMessage;
    private String previewImageUrl;
    private String loadingIconUrl;
    private String previewHexColor;
    private boolean isPlayable;
}
