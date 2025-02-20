package de.szut.lf8_starter.user;


import de.szut.lf8_starter.models.TokenResponse;
import de.szut.lf8_starter.user.dto.RegisterUserDto;
import de.szut.lf8_starter.services.KeycloakService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "api/user")
public class UserController {
    private final KeycloakService service;

    public UserController(KeycloakService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public ResponseEntity<TokenResponse> register(@RequestBody @Valid RegisterUserDto dto) throws Exception {
        TokenResponse tokenResponse = this.service.registerUser(dto.getUsername(), dto.getPassword(), dto.getEmail());
        if (tokenResponse != null) {
            return ResponseEntity.ok(tokenResponse);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


}
