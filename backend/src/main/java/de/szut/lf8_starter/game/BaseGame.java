package de.szut.lf8_starter.game;

import lombok.Data;

public abstract class BaseGame implements IGame{
    @Override
    public GameMetadata getMetadata() {
        return new GameMetadata(getId(), getTitle(), getDescription(), getPreviewImageUrl(), getLoadingIconUrl(), getPreviewHexColor());
    }
}
