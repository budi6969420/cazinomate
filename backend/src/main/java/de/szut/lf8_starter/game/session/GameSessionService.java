package de.szut.lf8_starter.game.session;

import de.szut.lf8_starter.game.IGame;

import java.util.Optional;

public interface GameSessionService<T extends BaseSessionExtension> {
    IGame getGame();
    Optional<GameSessionAggregate<T>> findActiveSession(String userId, String gameId);
    GameSessionAggregate<T> startSession(String userId, String gameId, Integer difficulty, int investedBalance);
    GameSessionAggregate<T> processAction(String sessionId, String userId, String interaction);
}
