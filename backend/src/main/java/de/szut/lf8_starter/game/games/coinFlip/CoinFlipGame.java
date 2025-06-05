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
        return "Flip The Coin";
    }

    @Override
    public HeaderedText[] getDescription() {
        return new HeaderedText[] {
                new HeaderedText("Coins setzen", new String[] {
                        "Lege fest, wie viele Coins du einsetzen möchtest."
                }),
                new HeaderedText("Schwierigkeitsgrad wählen", new String[] {
                        "Wähle zwischen „Einfach“, „Normal“ (Standard) und „Schwer“.",
                        "Jede Stufe hat eigene Gewinnchancen und Multiplikatoren."
                }),
                new HeaderedText("Spiel starten", new String[] {
                        "Starte das Spiel mit einem Klick auf „Spiel starten“."
                }),
                new HeaderedText("Mit Enter bewegen", new String[] {
                        "Drücke die Enter-Taste, um dein Hühnchen Schritt für Schritt über die Straße zu steuern."
                }),
                new HeaderedText("Spielziel", new String[] {
                        "Versuche, die richtige Münzseite zu erhalten."
                }),
                new HeaderedText("Welche Münzseite", new String[] {
                        "Gewonnen: Die Münze landet mit dem lebenden Crewmate oben.",
                        "Verloren: Die Münze zeigt den getöteten Crewmate."
                }),
                new HeaderedText("Erneut spielen", new String[] {
                        "Lust auf eine neue Runde? Du kannst jederzeit wieder einsteigen und dein Glück erneut versuchen."
                }),
        };
    }

    @Override
    public String getLovelyDescriptionMessage() {
        return "Viel Erfolg – und viel Glück beim Flippen!";
    }

    @Override
    public String getPreviewImageUrl() {
        return "https://cdn.budidev.de/5a7bc";
    }

    @Override
    public String getLoadingIconUrl() {
        return "https://cdn.budidev.de/63530";
    }

    @Override
    public String getPreviewHexColor() {
        return "#ADA01E";
    }

    @Override
    public boolean getIsPlayable() {
        return true;
    }

    @Override
    public boolean getIsPlayable() { return true; }
}
