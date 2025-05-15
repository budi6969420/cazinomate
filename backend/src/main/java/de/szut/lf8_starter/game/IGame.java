package de.szut.lf8_starter.game;

public interface IGame {
    String getId();
    String getTitle();
    String getDescription();
    String getPreviewImageUrl();
    String getLoadingIconUrl();
    String getPreviewHexColor();

    GameMetadata getMetadata();
}
