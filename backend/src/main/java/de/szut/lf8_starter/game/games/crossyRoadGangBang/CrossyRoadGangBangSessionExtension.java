package de.szut.lf8_starter.game.games.crossyRoadGangBang;

import de.szut.lf8_starter.game.session.BaseSessionExtension;
import de.szut.lf8_starter.game.session.enums.GameDifficulty;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Transient;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class CrossyRoadGangBangSessionExtension implements BaseSessionExtension {
    @Id
    private String sessionId;

    private int currentIndex;
    private int balanceDifference;

    @Transient
    private int wouldHaveLostIndex = -1;

    public List<Integer> getPrizeIndexValues(int investedBalance, GameDifficulty difficulty) {
        int length = 12;
        List<Integer> prizes = new ArrayList<>(length);

        double percentage = switch (difficulty) {
            case EASY -> 0.03;
            case NORMAL -> 0.05;
            case HARD -> 0.10;
        };

        int currentPrize = (int) (investedBalance * (1 + percentage));
        prizes.add(currentPrize);

        for (int i = 1; i < length; i++) {
            currentPrize = (int)((currentPrize) * (1 + percentage));
            prizes.add(currentPrize);
        }
        return prizes;
    }
}
