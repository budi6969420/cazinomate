package de.szut.lf8_starter.user;

import de.szut.lf8_starter.user.dto.KeycloakUserDto;
import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Pattern;

@Service
public class UserService {
    private final RestTemplate restTemplate;
    private final String keycloakUrl;
    private final String adminRealm;
    private final String realm;
    private final String adminClientId;
    private final String normalClientId;
    private final String adminUsername;
    private final String adminPassword;
    private static final String BEARER_REGEX_PATTERN = "^(\\{\\\"access_token\\\":\\\"(\\w+.){1,},\\\"expires_in\\\":\\d+,\\\"refresh_expires_in\\\":\\d+,\\\"refresh_token\\\":\\\"(\\w+.){1,},\\X+})$";

    public UserService(@Value("${keycloak.server-url}") String keycloakUrl,
                       @Value("${keycloak.realm}") String realm,
                       @Value("${keycloak.admin-realm}") String adminRealm,
                       @Value("${keycloak.admin-client-id}") String adminClientId,
                       @Value("${keycloak.normal-client-id}") String normalClientId,
                       @Value("${keycloak.admin-username}") String adminUsername,
                       @Value("${keycloak.admin-password}") String adminPassword) {
        this.keycloakUrl = keycloakUrl;
        this.adminRealm = adminRealm;
        this.realm = realm;
        this.adminClientId = adminClientId;
        this.normalClientId = normalClientId;
        this.adminUsername = adminUsername;
        this.adminPassword = adminPassword;
        this.restTemplate = new RestTemplate();
    }

    private TokenResponse getAdminToken() {
        MultiValueMap<String, String> requestBody = new LinkedMultiValueMap<>();
        requestBody.add("client_id", adminClientId);
        requestBody.add("grant_type", "password");
        requestBody.add("username", adminUsername);
        requestBody.add("password", adminPassword);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(requestBody, headers);
        ResponseEntity<TokenResponse> response = restTemplate.exchange(
                keycloakUrl + "/realms/" + adminRealm + "/protocol/openid-connect/token",
                HttpMethod.POST,
                request,
                TokenResponse.class
        );

        return response.getBody();
    }

    public User getUserData(String userId) {
        TokenResponse token = getAdminToken();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token.getAccess_token());

        HttpEntity<Void> request = new HttpEntity<>(headers);
        ResponseEntity<User> response = restTemplate.exchange(
                keycloakUrl + "/admin/realms/" + realm + "/users/" + userId,
                HttpMethod.GET,
                request,
                User.class
        );

        return response.getBody();
    }

    public void updateUser(User user) {
        TokenResponse token = getAdminToken();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + token.getAccess_token());

        // Map your custom User to a format Keycloak expects
        KeycloakUserDto keycloakUserDto = new KeycloakUserDto(
                user.getUsername(),
                user.getEmail(),
                user.isEmailVerified(),
                true
        );

        HttpEntity<KeycloakUserDto> request = new HttpEntity<>(keycloakUserDto, headers);

        try {
            restTemplate.exchange(
                    keycloakUrl + "/admin/realms/" + realm + "/users/" + user.getId(),
                    HttpMethod.PUT,
                    request,
                    Void.class
            );
        } catch (HttpClientErrorException.Conflict e) {
            throw new IllegalStateException("Username already exists", e);
        } catch (HttpClientErrorException e) {
            throw new RuntimeException("Failed to update user: " + e.getResponseBodyAsString(), e);
        }
    }


    public void updateUserPassword(String userId, String newPassword) {
        TokenResponse token = getAdminToken();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(token.getAccess_token());

        Map<String, Object> passwordPayload = new HashMap<>();
        passwordPayload.put("type", "password");
        passwordPayload.put("value", newPassword);
        passwordPayload.put("temporary", false);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(passwordPayload, headers);

        try {
            restTemplate.exchange(
                    keycloakUrl + "/admin/realms/" + realm + "/users/" + userId + "/reset-password",
                    HttpMethod.PUT,
                    request,
                    Void.class
            );
            //System.out.println("Password updated successfully for user ID: " + userId);
        } catch (HttpClientErrorException e) {
            //System.err.println("Error updating password for user ID: " + userId + ". Response: " + e.getResponseBodyAsString());
        }
    }


    public boolean validateUserPassword(String username, String password) {
        MultiValueMap<String, String> requestBody = new LinkedMultiValueMap<>();
        requestBody.add("client_id", normalClientId);
        requestBody.add("grant_type", "password");
        requestBody.add("username", username);
        requestBody.add("password", password);

        WebClient client = WebClient.builder()
                .baseUrl(keycloakUrl)
                .build();

        try {
            String requestResponse = client.post()
                    .uri("/realms/" + realm + "/protocol/openid-connect/token")
                    .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_FORM_URLENCODED_VALUE)
                    .body(BodyInserters.fromFormData(requestBody))
                    .retrieve().bodyToMono(String.class).block();

            return Pattern.compile(BEARER_REGEX_PATTERN)
                    .matcher(requestResponse)
                    .matches();
        } catch (Exception e) {
            return false;
        }
    }
}
