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
    private String description;
    private String previewImageUrl;
    private String previewHexColor;
}
