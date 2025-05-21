package de.szut.lf8_starter.game.games.crossyRoadGangBang;

import de.szut.lf8_starter.game.session.BaseSession;
import de.szut.lf8_starter.game.session.BaseSessionDto;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class CrossyRoadGangBangSessionDto extends BaseSessionDto {
    public CrossyRoadGangBangSessionDto(BaseSession baseSession, CrossyRoadGangBangSessionExtension sessionExtension) {
        super(baseSession);
        this.currentIndex = sessionExtension.getCurrentIndex();
        this.balanceDifference = sessionExtension.getBalanceDifference();
        this.prizeIndexValues = sessionExtension.getPrizeIndexValues(baseSession.getInvestedBalance(), baseSession.getDifficulty());
    }

    private int currentIndex;
    private int balanceDifference;
    private List<Integer> prizeIndexValues;
}
