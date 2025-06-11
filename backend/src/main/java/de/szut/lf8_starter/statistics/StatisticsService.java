package de.szut.lf8_starter.statistics;


import de.szut.lf8_starter.game.session.GameSessionDispatcher;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StatisticsService {

    private final GameSessionDispatcher sessionDispatcher;

    public StatisticsService(GameSessionDispatcher sessionDispatcher) {
        this.sessionDispatcher = sessionDispatcher;
    }

    public GameStatisticsModel getStatisticsForGameAndUser(String gameId, String userId) {
        return sessionDispatcher.getGameService(gameId).generateStatistics(userId);
    }

    public List<GameStatisticsModel> getStatisticsForUser(String userId) {
        return sessionDispatcher.getAllGameServices().stream().map(x -> x.generateStatistics(userId)).filter(x -> x.getTotalGamesPlayed() > 0).toList();
    }

    public GameStatisticsModel getStatisticsForGameGlobal(String gameId) {
        return sessionDispatcher.getGameService(gameId).generateStatistics(null);
    }

    public List<GameStatisticsModel> getStatisticsForAllGameGlobal() {
        return sessionDispatcher.getAllGameServices().stream().map(x -> x.generateStatistics(null)).filter(x -> x.getTotalGamesPlayed() > 0).toList();
    }
}
