package de.szut.lf8_starter.game.session.requests;

import lombok.Data;

@Data
public class SessionActionRequest {
    private String gameId;
    private String sessionId;
    private String interaction;
}
