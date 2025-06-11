package de.szut.lf8_starter.game.session;

import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class GameSessionDispatcher {

    private final Map<String, IGameSessionService<? extends BaseSessionExtension>> services;

    public GameSessionDispatcher(List<IGameSessionService<? extends BaseSessionExtension>> serviceList) {
        services = new HashMap<>();
        for (IGameSessionService<?> service : serviceList) {
            services.put(service.getGame().getId(), service);
        }
    }

    public <T extends BaseSessionExtension> GameSessionAggregate<T> start(
            String gameId, String userId, Integer difficulty, int investedBalance) throws BadRequestException {

        var service = (IGameSessionService<T>) services.get(gameId);
        if (service == null) throw new IllegalArgumentException("Unsupported game: " + gameId);
        return service.startSession(userId, gameId, difficulty, investedBalance);
    }

    public <T extends BaseSessionExtension> GameSessionAggregate<T> processAction(
            String gameId, String userId, String sessionId, String interaction) {

        var service = (IGameSessionService<T>) services.get(gameId);
        if (service == null) throw new IllegalArgumentException("Unsupported game: " + gameId);
        return service.processAction(sessionId, userId, interaction);
    }

    public <T extends BaseSessionExtension> Optional<GameSessionAggregate<T>> findActive(String gameId, String userId) {
        var service = (IGameSessionService<T>) services.get(gameId);
        if (service == null) throw new IllegalArgumentException("Unsupported game: " + gameId);
        return service.findActiveSession(userId, gameId);
    }

    public IGameSessionService<?> getGameService(String gameId) {
        return services.get(gameId);
    }
    public List<IGameSessionService<?>> getAllGameServices() {
        return new ArrayList<>(services.values());
    }

}
