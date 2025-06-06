package de.szut.lf8_starter.game.games.slots;

import de.szut.lf8_starter.game.BaseGame;
import de.szut.lf8_starter.game.HeaderedText;

public class SlotsGame extends BaseGame {
    @Override
    public String getId() {
        return "slots";
    }

    @Override
    public String getTitle() {
        return "The Lucky Crewmate";
    }

    @Override
    public HeaderedText[] getDescription() { return new HeaderedText[0]; }

    @Override
    public String getLovelyDescriptionMessage() {
        return "";
    }

    @Override
    public String getPreviewImageUrl() {
        return "https://cdn.budidev.de/c57e5";
    }

    @Override
    public String getLoadingIconUrl() {
        return "https://cdn.budidev.de/3655d";
    }

    @Override
    public String getPreviewHexColor() {
        return "#EE0D0D";
    }

    @Override
    public boolean getIsPlayable() {
        return false;
    }
}
