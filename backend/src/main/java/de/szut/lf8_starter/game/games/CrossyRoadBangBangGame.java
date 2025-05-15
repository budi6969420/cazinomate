package de.szut.lf8_starter.game.games;

import de.szut.lf8_starter.game.BaseGame;

public class CrossyRoadBangBangGame extends BaseGame {
    @Override
    public String getId() {
        return "39c63177-b7ad-478b-a009-69b8fa043e6f";
    }

    @Override
    public String getTitle() {
        return "Crossy Road Gang! Bang!";
    }

    @Override
    public String getDescription() { return "TBA"; }

    @Override
    public String getPreviewImageUrl() {
        return "https://static.wikia.nocookie.net/crossyroad/images/7/73/CrossyRoad_Chicken_x_AmongUs_RedCrewmate.png/revision/latest?cb=20240924183713";
    }

    @Override
    public String getLoadingIconUrl() {
        return "/images/cazinomate-logo.svg";
    }

    @Override
    public String getPreviewHexColor() {
        return "#2A03C7";
    }
}
