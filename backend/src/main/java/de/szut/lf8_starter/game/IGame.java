package de.szut.lf8_starter.game;

public interface IGame {
    String getId();
    String getTitle();
    HeaderedText[] getDescription();
    String getLovelyDescriptionMessage();
    String getPreviewImageUrl();
    String getLoadingIconUrl();
    String getPreviewHexColor();
    boolean getIsPlayable();

    GameMetadata getMetadata();
}
