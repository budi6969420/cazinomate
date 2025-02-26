package de.szut.lf8_starter.auth;


import de.szut.lf8_starter.models.TokenResponse;
import de.szut.lf8_starter.user.dto.LoginUserDto;
import de.szut.lf8_starter.user.dto.RegisterUserDto;
import de.szut.lf8_starter.services.KeycloakService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "api/auth")
public class AuthController {
    private final KeycloakService service;

    public AuthController(KeycloakService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public ResponseEntity<TokenResponse> register(@RequestBody @Valid RegisterUserDto dto) {
        var tokenResponse = this.service.registerUser(dto.getUsername(), dto.getPassword(), dto.getEmail());
        return ResponseEntity.ok(tokenResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@RequestBody @Valid LoginUserDto dto) {
        var tokenResponse = this.service.loginUser(dto.getUsername(), dto.getPassword());
        return ResponseEntity.ok(tokenResponse);
    }
}