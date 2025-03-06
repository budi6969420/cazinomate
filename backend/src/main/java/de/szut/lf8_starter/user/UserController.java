package de.szut.lf8_starter.user;


import de.szut.lf8_starter.models.User;
import de.szut.lf8_starter.services.JWTService;
import de.szut.lf8_starter.services.KeycloakService;
import de.szut.lf8_starter.transaction.BalanceDto;
import de.szut.lf8_starter.transaction.TransactionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "api/user")
public class UserController {
    private final KeycloakService keycloakService;
    private final JWTService jwtService;
    private final TransactionService transactionService;

    public UserController(KeycloakService keycloakService, JWTService jwtService, TransactionService transactionService) {
        this.keycloakService = keycloakService;
        this.jwtService = jwtService;
        this.transactionService = transactionService;
    }

    @GetMapping("/self")
    public ResponseEntity<User> getSelfInfo(@RequestHeader(value = "Authorization", required = false) String authorizationHeader) throws Exception {
        return ResponseEntity.ok(keycloakService.getUserData(jwtService.decodeId(authorizationHeader)));
    }

    @GetMapping("/self/balance")
    public ResponseEntity<BalanceDto> getSelfBalance(@RequestHeader(value = "Authorization", required = false) String authorizationHeader) throws Exception {
        return ResponseEntity.ok(new BalanceDto(transactionService.GetUserBalance(jwtService.decodeId(authorizationHeader))));
    }


    @GetMapping("/{userId}")
    public ResponseEntity<User> getUser(@PathVariable String userId) {
        if (keycloakService.getUserData(userId) == null) return ResponseEntity.notFound().build();

        return ResponseEntity.ok(keycloakService.getUserData(userId));
    }

    @GetMapping("/{userId}/balance")
    public ResponseEntity<BalanceDto> getBalance(@PathVariable String userId) {
        if (keycloakService.getUserData(userId) == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(new BalanceDto(transactionService.GetUserBalance(userId)));
    }

}
