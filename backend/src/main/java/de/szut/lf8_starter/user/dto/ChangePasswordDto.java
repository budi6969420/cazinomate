package de.szut.lf8_starter.user.dto;

import lombok.Data;

@Data
public class ChangePasswordDto {
    String password;
    String currentPassword;
}
