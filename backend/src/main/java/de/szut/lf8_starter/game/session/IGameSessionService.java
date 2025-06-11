package de.szut.lf8_starter.game.session;

import de.szut.lf8_starter.game.IGame;
import de.szut.lf8_starter.game.session.enums.GameDifficulty;
import de.szut.lf8_starter.statistics.GameStatisticsModel;
import org.apache.coyote.BadRequestException;

import java.util.Optional;

public interface IGameSessionService<T extends BaseSessionExtension> {
    IGame getGame();
    Optional<GameSessionAggregate<T>> findActiveSession(String userId, String gameId);
    GameSessionAggregate<T> startSession(String userId, String gameId, Integer difficulty, int investedBalance) throws BadRequestException;
    GameSessionAggregate<T> processAction(String sessionId, String userId, String interaction);
    GameStatisticsModel generateStatistics(String userId);

    int getPrize(int balanceInvested, GameDifficulty gameDifficulty, T session);
}
