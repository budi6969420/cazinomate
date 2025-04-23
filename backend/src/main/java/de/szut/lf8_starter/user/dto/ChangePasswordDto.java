package de.szut.lf8_starter.user.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class ChangePasswordDto {
    @NotBlank
    @Pattern(
            regexp = "^(?=.*[A-Z])(?=.*[!@#$%^&*()_+=\\[\\]{};':\"\\\\|,.<>\\/?]).{8,}$",
            message = "Password must be at least 8 characters long, contain an uppercase letter and a special character."
    )
    String password;
    String currentPassword;
}
