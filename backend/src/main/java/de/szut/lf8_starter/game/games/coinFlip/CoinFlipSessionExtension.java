package de.szut.lf8_starter.game.games.coinFlip;

import de.szut.lf8_starter.game.session.BaseSessionExtension;
import de.szut.lf8_starter.game.session.enums.GameDifficulty;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class CoinFlipSessionExtension implements BaseSessionExtension {
    @Id
    private String sessionId;
    private int balanceDifference;
}
