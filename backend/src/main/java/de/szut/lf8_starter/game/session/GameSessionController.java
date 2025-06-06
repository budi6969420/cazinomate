package de.szut.lf8_starter.game.session;

import de.szut.lf8_starter.game.session.requests.SessionActionRequest;
import de.szut.lf8_starter.game.session.requests.StartSessionRequest;
import de.szut.lf8_starter.user.JwtService;
import de.szut.lf8_starter.user.KeycloakService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("game/session")
public class GameSessionController {

    private final GameSessionDispatcher dispatcher;
    private final GameSessionDtoMapper dtoMapper;
    private final KeycloakService keycloakService;
    private final JwtService jwtService;

    public GameSessionController(GameSessionDispatcher dispatcher, GameSessionDtoMapper dtoMapper, KeycloakService keycloakService, JwtService jwtService) {
        this.dispatcher = dispatcher;
        this.dtoMapper = dtoMapper;
        this.keycloakService = keycloakService;
        this.jwtService = jwtService;
    }

    @GetMapping("/find-active")
    public ResponseEntity<? extends BaseSessionDto> findActiveSession(
            @RequestParam String gameId,
            @RequestHeader(value = "Authorization", required = false) String authorizationHeader) throws Exception {
        var user = keycloakService.getUserData(jwtService.decodeId(authorizationHeader));
        if (user == null) return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

        var optAggregate = dispatcher.findActive(gameId, user.getId());
        if (optAggregate.isEmpty()) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return ResponseEntity.ok(dtoMapper.mapToDto(optAggregate.get()));
    }

    @PostMapping("/start")
    public ResponseEntity<? extends BaseSessionDto> startSession(
            @RequestBody StartSessionRequest request,
            @RequestHeader(value = "Authorization", required = false) String authorizationHeader) throws Exception {

        var user = keycloakService.getUserData(jwtService.decodeId(authorizationHeader));
        if (user == null) return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

        var aggregate = dispatcher.start(request.getGameId(), user.getId(), request.getDifficulty(), request.getInvestedBalance());
        return ResponseEntity.ok(dtoMapper.mapToDto(aggregate));
    }

    @PostMapping("/action")
    public ResponseEntity<? extends BaseSessionDto> sessionAction(
            @RequestHeader(value = "Authorization", required = false) String authorizationHeader,
            @RequestBody SessionActionRequest request) throws Exception {

        var user = keycloakService.getUserData(jwtService.decodeId(authorizationHeader));
        if (user == null) return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

        var aggregate = dispatcher.processAction(request.getGameId(), user.getId(), request.getSessionId(), request.getInteraction());
        return ResponseEntity.ok(dtoMapper.mapToDto(aggregate));
    }
}

