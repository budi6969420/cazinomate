package de.szut.lf8_starter.statistics;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GameStatisticsModel {
    private String gameId;
    private int totalGamesPlayed;
    private int totalGamesWon;
    private int amountInvested;
    private int amountWon;
}
