package de.szut.lf8_starter.user.dto;

import lombok.Data;

@Data
public class ChangeUsernameDto {
    String username;
    String currentPassword;
}
