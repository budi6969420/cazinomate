package de.szut.lf8_starter.game.session;

import lombok.Data;

@Data
public class GameSessionAggregate<T extends BaseSessionExtension> {
    private final BaseSession base;
    private final T extension;
}
