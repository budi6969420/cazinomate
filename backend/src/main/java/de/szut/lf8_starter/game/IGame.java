package de.szut.lf8_starter.game;

public interface IGame {
    String getId();
    String getTitle();
    String getPreviewImageUrl();

    GameMetadata getMetadata();
}
