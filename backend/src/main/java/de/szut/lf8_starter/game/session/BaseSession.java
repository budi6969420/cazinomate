package de.szut.lf8_starter.game.session;

import de.szut.lf8_starter.game.session.enums.GameDifficulty;
import de.szut.lf8_starter.game.session.enums.GameState;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class BaseSession {
    @Id
    private String id;
    private String gameId;
    private String userId;
    private int investedBalance;

    @Enumerated(EnumType.STRING)
    private GameState gameState = GameState.ACTIVE;

    @Enumerated(EnumType.STRING)
    private GameDifficulty difficulty = GameDifficulty.NORMAL;
}
