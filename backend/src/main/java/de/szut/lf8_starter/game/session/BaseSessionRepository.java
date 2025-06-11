package de.szut.lf8_starter.game.session;

import de.szut.lf8_starter.game.session.enums.GameState;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BaseSessionRepository extends JpaRepository<BaseSession, String> {
    List<BaseSession> findAllByUserIdAndGameIdAndGameState(String userId, String gameId, GameState gameState);
    List<BaseSession> findAllByUserIdAndGameId(String userId, String gameId);
    List<BaseSession> findAllByGameId(String gameId);
}
