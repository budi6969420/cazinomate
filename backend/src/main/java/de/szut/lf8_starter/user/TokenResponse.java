package de.szut.lf8_starter.user;

import lombok.Data;

@Data
public class TokenResponse {
    private String access_token;
    private String refresh_token;
    private String token_type;
    private int expires_in;
    private int refresh_expires_in;
}