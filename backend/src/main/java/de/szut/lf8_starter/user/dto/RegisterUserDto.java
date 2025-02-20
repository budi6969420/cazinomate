package de.szut.lf8_starter.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RegisterUserDto {
    private String username;
    private String password;
    private String email;
}
