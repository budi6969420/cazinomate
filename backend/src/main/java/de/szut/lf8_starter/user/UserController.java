package de.szut.lf8_starter.user;


import de.szut.lf8_starter.transaction.BalanceDto;
import de.szut.lf8_starter.transaction.TransactionDto;
import de.szut.lf8_starter.transaction.TransactionService;
import de.szut.lf8_starter.user.dto.ChangePasswordDto;
import de.szut.lf8_starter.user.dto.ChangeUsernameDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "user")
public class UserController {
    private final KeycloakService keycloakService;
    private final JwtService jwtService;
    private final TransactionService transactionService;

    public UserController(KeycloakService keycloakService, JwtService jwtService, TransactionService transactionService) {
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
    @GetMapping("/self/transactions")
    public ResponseEntity<List<TransactionDto>> getSelfTransactions(
            @RequestHeader(value = "Authorization", required = false) String authorizationHeader) throws Exception {
                return ResponseEntity.ok(transactionService
                .getUserTransactions(jwtService.decodeId(authorizationHeader))
                .stream()
                .map(TransactionDto::new)
                .toList());
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

    @PutMapping("/password")
    public ResponseEntity<?> changePassword(@RequestHeader(value = "Authorization", required = false) String authorizationHeader, @RequestBody ChangePasswordDto changeDto) throws Exception {
        var user = keycloakService.getUserData(jwtService.decodeId(authorizationHeader));
        var currentPasswordValid = keycloakService.validateUserPassword(user.getUsername(), changeDto.getCurrentPassword());

        if (!currentPasswordValid) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Current password is incorrect");
        }

        keycloakService.updateUserPassword(user.getId(), changeDto.getPassword());

        return ResponseEntity.ok().build();
    }

    @PutMapping("/username")
    public ResponseEntity<?> changeUsername(@RequestHeader(value = "Authorization", required = false) String authorizationHeader, @RequestBody ChangeUsernameDto changeDto) throws Exception {
        var user = keycloakService.getUserData(jwtService.decodeId(authorizationHeader));
        var currentPasswordValid = keycloakService.validateUserPassword(user.getUsername(), changeDto.getCurrentPassword());

        if (!currentPasswordValid) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Password is incorrect");
        }

        user.setUsername(changeDto.getUsername());
        keycloakService.updateUser(user);
        return ResponseEntity.ok(user);
    }
}
