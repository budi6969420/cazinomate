package de.szut.lf8_starter.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginUserDto {
    private String username;
    private String password;
}
