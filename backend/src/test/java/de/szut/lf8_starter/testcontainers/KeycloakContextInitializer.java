package de.szut.lf8_starter.testcontainers;

import dasniko.testcontainers.keycloak.KeycloakContainer;
import org.springframework.boot.test.util.TestPropertyValues;
import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;

public class KeycloakContextInitializer implements ApplicationContextInitializer<ConfigurableApplicationContext> {
    static String serverUrl;
    private static final KeycloakContainer keycloak = new KeycloakContainer();

    @Override
    public void initialize(ConfigurableApplicationContext applicationContext) {
        keycloak.withRealmImportFile("lf12-realm.json");
        keycloak.start();
        serverUrl = keycloak.getAuthServerUrl();
        TestPropertyValues.of(
                "keycloak.server-url=" + serverUrl,
                "spring.security.oauth2.client.provider.keycloak.issuer-uri=" + keycloak.getAuthServerUrl() + "/realms/LF12",
                "spring.security.oauth2.resourceserver.jwt.issuer-uri=" + keycloak.getAuthServerUrl() + "/realms/LF12"
        ).applyTo(applicationContext.getEnvironment());
    }
}
