package de.szut.lf8_starter.game.session;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class GameSessionDispatcher {

    private final Map<String, GameSessionService<? extends BaseSessionExtension>> services;

    public GameSessionDispatcher(List<GameSessionService<? extends BaseSessionExtension>> serviceList) {
        services = new HashMap<>();
        for (GameSessionService<?> service : serviceList) {
            services.put(service.getGame().getId(), service);
        }
    }

    public <T extends BaseSessionExtension> GameSessionAggregate<T> start(
            String gameId, String userId, Integer difficulty, int investedBalance) {

        var service = (GameSessionService<T>) services.get(gameId);
        if (service == null) throw new IllegalArgumentException("Unsupported game: " + gameId);
        return service.startSession(userId, gameId, difficulty, investedBalance);
    }

    public <T extends BaseSessionExtension> GameSessionAggregate<T> processAction(
            String gameId, String userId, String sessionId, String interaction) {

        var service = (GameSessionService<T>) services.get(gameId);
        if (service == null) throw new IllegalArgumentException("Unsupported game: " + gameId);
        return service.processAction(sessionId, userId, interaction);
    }

    public <T extends BaseSessionExtension> Optional<GameSessionAggregate<T>> findActive(String gameId, String userId) {
        var service = (GameSessionService<T>) services.get(gameId);
        if (service == null) throw new IllegalArgumentException("Unsupported game: " + gameId);
        return service.findActiveSession(userId, gameId);
    }

}
