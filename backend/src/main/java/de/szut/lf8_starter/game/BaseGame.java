package de.szut.lf8_starter.game;

public abstract class BaseGame implements IGame{
    @Override
    public GameMetadata getMetadata() {
        return new GameMetadata(getId(), getTitle(), getDescription(), getLovelyDescriptionMessage(), getPreviewImageUrl(), getLoadingIconUrl(), getPreviewHexColor());
    }
}
