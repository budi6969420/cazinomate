package de.szut.lf8_starter.user.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ChangeUsernameDto {

    @NotBlank
    @Size(min = 4, max = 20)
    @Pattern(regexp = "^[a-zA-Z0-9._]+$", message = "Username can only contain letters, digits, dots, and underscores.")
    String username;
    String currentPassword;
}
