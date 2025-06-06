package de.szut.lf8_starter.game.games.crossyRoad;

import de.szut.lf8_starter.game.BaseGame;
import de.szut.lf8_starter.game.HeaderedText;

public class CrossyRoadGame extends BaseGame {
    @Override
    public String getId() {
        return "39c63177-b7ad-478b-a009-69b8fa043e6f";
    }

    @Override
    public String getTitle() {
        return "Crossy Road";
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
                        "Überquere alle Spuren der Straße – je weiter du kommst, desto höher dein Gewinn."
                }),
                new HeaderedText("Nach jeder Spur: Risiko oder Sicherheit?", new String[] {
                        "Weiterspielen: Wage den nächsten Schritt und versuche, noch mehr zu gewinnen.",
                        "Sicher aussteigen: Lass dir deinen bisherigen Gewinn auszahlen und beende das Spiel freiwillig.",
                        "Achtung: Wirst du überfahren, verlierst du deinen Einsatz!"
                }),
                new HeaderedText("Straße vollständig überquert?", new String[] {
                        "Glückwunsch! Wenn du alle Spuren geschafft hast, hast du das Spiel gewonnen und bekommst den maximalen Gewinn."
                }),
                new HeaderedText("Spiel beenden – freiwillig oder unfreiwillig", new String[] {
                        "Beendest du freiwillig, siehst du, wo du potenziell gestorben wärst – dein Gewinn wird angezeigt.",
                        "Wirst du überfahren, erscheint ein Verloren-Overlay."
                }),
                new HeaderedText("Erneut spielen", new String[] {
                        "Lust auf eine neue Runde? Du kannst jederzeit wieder einsteigen."
                })
        };
    }

    @Override
    public String getLovelyDescriptionMessage() {
        return "Viel Erfolg – und komm sicher auf die andere Seite!";
    }

    @Override
    public boolean getIsPlayable() {
        return true;
    }

    @Override
    public String getPreviewImageUrl() {
        return "https://cdn.budidev.de/43f81";
    }

    @Override
    public String getLoadingIconUrl() {
        return "https://cdn.budidev.de/2d3e8";
    }

    @Override
    public String getPreviewHexColor() {
        return "#8308FF";
    }
}
