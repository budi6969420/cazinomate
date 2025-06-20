package de.szut.lf8_starter.statistics;

import de.szut.lf8_starter.user.JwtService;
import de.szut.lf8_starter.user.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/statistics")
public class StatisticsController {
    private final StatisticsService statisticsService;
    private final UserService userService;
    private final JwtService jwtService;

    public StatisticsController(StatisticsService statisticsService, UserService userService, JwtService jwtService) {
        this.statisticsService = statisticsService;
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @GetMapping("{gameId}/self")
    public ResponseEntity<GameStatisticsModel> getStatisticsForGameAndUser(
            @PathVariable String gameId,
            @RequestHeader(value = "Authorization", required = false) String authorizationHeader) throws Exception {
        var user = userService.getUserData(jwtService.decodeId(authorizationHeader));
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return ResponseEntity.ok(statisticsService.getStatisticsForGameAndUser(gameId, user.getId()));
    }

        @GetMapping("self")
        public ResponseEntity<List<GameStatisticsModel>> getStatisticsForUser(
                @RequestHeader(value = "Authorization", required = false) String authorizationHeader) throws Exception {
            var user = userService.getUserData(jwtService.decodeId(authorizationHeader));
            if (user == null) {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
            return ResponseEntity.ok(statisticsService.getStatisticsForUser(user.getId()));
        }


    @GetMapping("{gameId}")
    public ResponseEntity<GameStatisticsModel> getStatisticsForGameGlobal(
            @PathVariable String gameId) {
        return ResponseEntity.ok(statisticsService.getStatisticsForGameGlobal(gameId));
    }

    @GetMapping("global")
    public ResponseEntity<List<GameStatisticsModel>> getStatisticsForAllGameGlobal() {
        return ResponseEntity.ok(statisticsService.getStatisticsForAllGameGlobal());
    }
}