package de.szut.lf8_starter.user.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class KeycloakUserDto {
    private String username;
    private String email;
    private boolean emailVerified;
    private boolean enabled;
}
