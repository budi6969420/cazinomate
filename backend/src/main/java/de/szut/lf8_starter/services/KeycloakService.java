package de.szut.lf8_starter.services;

import de.szut.lf8_starter.models.TokenResponse;
import de.szut.lf8_starter.models.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class KeycloakService {
    private final RestTemplate restTemplate;
    private final String keycloakUrl;
    private final String adminRealm;
    private final String realm;
    private final String adminClientId;
    private final String normalClientId;
    private final String adminUsername;
    private final String adminPassword;

    public KeycloakService(@Value("${keycloak.server-url}") String keycloakUrl,
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
        ResponseEntity<Map> response = restTemplate.exchange(
                keycloakUrl + "/admin/realms/" + realm + "/users/" + userId,
                HttpMethod.GET,
                request,
                Map.class
        );

        return mapToUser(response.getBody());
    }

    private User mapToUser(Map<String, Object> data) {
        User user = new User();
        user.setId((String) data.get("id"));
        user.setUsername((String) data.get("username"));
        user.setEmail((String) data.get("email"));
        user.setEmailVerified((boolean) data.get("emailVerified"));
        return user;
    }
}
