package de.szut.lf8_starter.game.session.requests;

import lombok.Data;

@Data
public class StartSessionRequest {
    private String gameId;
    private Integer difficulty;
    private int investedBalance;
}
