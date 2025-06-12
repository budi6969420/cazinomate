package de.szut.lf8_starter.game;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping(value = "/game")
@RestController
public class GameController {

    private final GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<GameMetadata> getGameMetadata(@PathVariable final String id) {
        var game = this.gameService.getGameMetadataById(id);
        if (game == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(game);
    }

    @GetMapping()
    public ResponseEntity<List<GameMetadata>> getAllGameMetadata() {
        var games = this.gameService.getGamesMetadata();
        return ResponseEntity.ok(games);
    }
}
