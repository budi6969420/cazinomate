package de.szut.lf8_starter.game;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping(value = "game")
@RestController
public class GameController {

    private final GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<GameMetadata> getGameMetadata(@RequestParam final String id) {
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
