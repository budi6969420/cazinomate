package de.szut.lf8_starter.game.games.coinFlip;

import de.szut.lf8_starter.game.session.BaseSession;
import de.szut.lf8_starter.game.session.BaseSessionDto;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class CoinFlipSessionDto extends BaseSessionDto {
    public CoinFlipSessionDto(BaseSession baseSession, CoinFlipSessionExtension sessionExtension) {
        super(baseSession);
        this.balanceDifference = sessionExtension.getBalanceDifference();
    }
    private int balanceDifference;
}
