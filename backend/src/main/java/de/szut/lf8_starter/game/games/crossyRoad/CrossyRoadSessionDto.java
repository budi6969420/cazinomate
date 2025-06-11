package de.szut.lf8_starter.game.games.crossyRoad;

import de.szut.lf8_starter.game.session.BaseSession;
import de.szut.lf8_starter.game.session.BaseSessionDto;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class CrossyRoadSessionDto extends BaseSessionDto {
    public CrossyRoadSessionDto(BaseSession baseSession, CrossyRoadSessionExtension sessionExtension) {
        super(baseSession);
        this.currentIndex = sessionExtension.getCurrentIndex();
        this.balanceDifference = sessionExtension.getBalanceDifference();
        this.prizeIndexValues = sessionExtension.getPrizeIndexValues(baseSession.getInvestedBalance(), baseSession.getDifficulty());
        this.wouldHaveLostAtIndex = sessionExtension.getWouldHaveLostIndex();
    }

    private int currentIndex;
    private int balanceDifference;
    private List<Integer> prizeIndexValues;
    private int wouldHaveLostAtIndex;
}
