package de.szut.lf8_starter.user;


import de.szut.lf8_starter.models.User;
import de.szut.lf8_starter.services.JWTService;
import de.szut.lf8_starter.services.KeycloakService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "api/user")
public class UserController {
    private final KeycloakService keycloakService;
    private final JWTService jwtService;

    public UserController(KeycloakService keycloakService, JWTService jwtService) {
        this.keycloakService = keycloakService;
        this.jwtService = jwtService;
    }

    @GetMapping("/self")
    public ResponseEntity<User> getSelfInfo(@RequestHeader(value = "Authorization", required = false) String authorizationHeader) throws Exception {
        return ResponseEntity.ok(keycloakService.getUserData(jwtService.decodeId(authorizationHeader)));
    }

    @GetMapping()
    public ResponseEntity<User> getUser(String userId) {
        return ResponseEntity.ok(keycloakService.getUserData(userId));
    }
}
