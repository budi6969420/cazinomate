package de.szut.lf8_starter.game.games.slots;

import de.szut.lf8_starter.game.session.BaseSessionExtension;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class SlotsSessionExtension implements BaseSessionExtension {
    @Id
    private String sessionId;
}
