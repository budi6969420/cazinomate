package de.szut.lf8_starter.game.session;

import de.szut.lf8_starter.game.games.coinFlip.CoinFlipSessionDto;
import de.szut.lf8_starter.game.games.coinFlip.CoinFlipSessionExtension;
import de.szut.lf8_starter.game.games.crossyRoad.CrossyRoadSessionDto;
import de.szut.lf8_starter.game.games.crossyRoad.CrossyRoadSessionExtension;
import org.springframework.stereotype.Component;

@Component
public class GameSessionDtoMapper {
    public BaseSessionDto mapToDto(GameSessionAggregate<?> aggregate) {
        return switch (aggregate.getExtension()) {
            case CrossyRoadSessionExtension ext -> new CrossyRoadSessionDto(aggregate.getBase(), ext);
            case CoinFlipSessionExtension ext -> new CoinFlipSessionDto(aggregate.getBase(), ext);
            default -> throw new IllegalArgumentException("Unsupported extension: " + aggregate.getExtension().getClass());
        };
    }
}
