package de.szut.lf8_starter.game.session;

import de.szut.lf8_starter.game.session.enums.GameDifficulty;
import de.szut.lf8_starter.game.session.enums.GameState;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BaseSessionDto {

    public BaseSessionDto(BaseSession baseSession) {
        this.id = baseSession.getId();
        this.gameId = baseSession.getGameId();
        this.userId = baseSession.getUserId();
        this.investedBalance = baseSession.getInvestedBalance();
        this.balanceDifference = baseSession.getBalanceDifference();
        this.gameState = baseSession.getGameState();
        this.difficulty = baseSession.getDifficulty();
    }

    private String id;
    private String gameId;
    private String userId;
    private int investedBalance;
    private int balanceDifference;
    private GameState gameState;
    private GameDifficulty difficulty;

}
