package de.szut.lf8_starter.game.games.coinFlip;

import de.szut.lf8_starter.game.BaseGame;
import de.szut.lf8_starter.game.HeaderedText;

public class CoinFlipGame extends BaseGame {
    @Override
    public String getId() {
        return "0b283c6d-b147-4d66-94a4-e120811d1cf0";
    }

    @Override
    public String getTitle() {
        return "Coin Flip";
    }

    @Override
    public HeaderedText[] getDescription() { return new HeaderedText[0]; }

    @Override
    public String getLovelyDescriptionMessage() {
        return "TBA";
    }

    @Override
    public String getPreviewImageUrl() {
        return "https://cdn.dribbble.com/userupload/20657419/file/original-bb95adb64824bcad48fca0e4f568c23e.gif";
    }

    @Override
    public String getLoadingIconUrl() {
        return "/images/cazinomate-logo.svg";
    }

    @Override
    public String getPreviewHexColor() {
        return "#2A03C7";
    }

    @Override
    public boolean getIsPlayable() { return true; }
}
