package de.szut.lf8_starter.game.session;

import de.szut.lf8_starter.game.session.enums.GameState;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BaseSessionRepository extends JpaRepository<BaseSession, String> {
    Optional<BaseSession> findByUserIdAndGameIdAndGameState(String userId, String gameId, GameState gameState);
}
