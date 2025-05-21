package de.szut.lf8_starter.game;

import de.szut.lf8_starter.game.games.CrossyRoadBangBangGame;
import de.szut.lf8_starter.game.games.SlotsGame;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameService {

    private final List<IGame> games = List.of(
            new CrossyRoadBangBangGame(),
            new SlotsGame()
    );

    public List<IGame> getGames() {
        return this.games;
    }

    public IGame getGameById(String id) {
        var optionalGame = games.stream().filter(x -> x.getId().equals(id)).findFirst();
        if (optionalGame.isEmpty()) return null;

        return optionalGame.get();
    }

    public GameMetadata getGameMetadataById(String id) {
        var optionalGame = games.stream().filter(x -> x.getId().equals(id)).findFirst();
        if (optionalGame.isEmpty()) return null;

        return optionalGame.get().getMetadata();
    }

    public List<GameMetadata> getGamesMetadata() {
        return this.games.stream().map(IGame::getMetadata).toList();
    }
}
