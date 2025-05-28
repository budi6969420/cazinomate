package de.szut.lf8_starter.game.session;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

import java.util.Optional;

@NoRepositoryBean
public interface BaseGameSessionExtensionRepository<T extends BaseSessionExtension, ID> extends JpaRepository<T, ID> {
    Optional<T> findBySessionId(String sessionId);
}
