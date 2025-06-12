package de.szut.lf8_starter.testcontainers;

import de.szut.lf8_starter.game.session.GameSessionDispatcher;
import de.szut.lf8_starter.payout.PayoutItemCouponModel;
import de.szut.lf8_starter.payout.PayoutReceiptEmailSendingService;
import de.szut.lf8_starter.transaction.ITransactionRepository;
import de.szut.lf8_starter.transaction.TransactionService;
import de.szut.lf8_starter.user.JwtService;
import de.szut.lf8_starter.user.TokenResponse;
import de.szut.lf8_starter.user.User;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.regex.Pattern;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("it")
@ContextConfiguration(initializers = {PostgresContextInitializer.class, KeycloakContextInitializer.class})
public class AbstractIntegrationTest {
    @Autowired
    protected MockMvc mockMvc;
    @Autowired
    protected ITransactionRepository transactionRepository;
    @MockBean
    protected JwtService jwtService;
    @SpyBean
    protected TransactionService mockedTransactionService;
    @SpyBean
    protected PayoutReceiptEmailSendingService mockedSendEmail;
    @SpyBean
    protected GameSessionDispatcher sessionDispatcher;
    @Captor
    protected ArgumentCaptor<PayoutItemCouponModel> emailCaptor;
    @Captor
    protected ArgumentCaptor<User> userCaptor;
    private static final String BEARER_REGEX_PATTERN = "^(\\{\"access_token\":\"(\\w+.)+,\"expires_in\":\\d+,\"refresh_expires_in\":\\d+,\"refresh_token\":\"(\\w+.)+,\\X+})$";

    @BeforeEach
    void generalSetUp() throws Exception {
        transactionRepository.deleteAll();
        when(jwtService.decodeId(any())).thenReturn("12345678-1234-1234-1234-123456789abc");
    }

    protected void mockJwtService() throws Exception {
        jwtService = mock(JwtService.class);
        when(jwtService.decodeId(any())).thenReturn("12345678-1234-1234-1234-123456789abc");
    }

    protected void reimportRealm() {
        deleteRealm();
        WebClient client = WebClient.builder()
                .baseUrl(KeycloakContextInitializer.serverUrl)
                .build();

        client.post()
                .uri("/admin/realms")
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + getAdminToken().getAccess_token())
                .bodyValue(readRealmImportFile()).retrieve().toBodilessEntity().block();
    }

    private void deleteRealm() {
        WebClient client = WebClient.builder()
                .baseUrl(KeycloakContextInitializer.serverUrl)
                .build();

        client.delete()
                .uri("admin/realms/LF12")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + getAdminToken().getAccess_token())
                .retrieve().toBodilessEntity().block();
    }

    protected boolean validateUserPassword(String username, String password) {
        MultiValueMap<String, String> requestBody = new LinkedMultiValueMap<>();
        requestBody.add("client_id", "lf12");
        requestBody.add("grant_type", "password");
        requestBody.add("username", username);
        requestBody.add("password", password);

        WebClient client = WebClient.builder()
                .baseUrl(KeycloakContextInitializer.serverUrl)
                .build();

        try {
            String requestResponse = client.post()
                    .uri("/realms/LF12/protocol/openid-connect/token")
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

    private TokenResponse getAdminToken() {
        MultiValueMap<String, String> requestBody = new LinkedMultiValueMap<>();
        requestBody.add("client_id", "admin-cli");
        requestBody.add("grant_type", "password");
        requestBody.add("username", "admin");
        requestBody.add("password", "admin");

        WebClient client = WebClient.builder()
                .baseUrl(KeycloakContextInitializer.serverUrl)
                .build();

        return client.post()
                .uri("/realms/master/protocol/openid-connect/token")
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_FORM_URLENCODED_VALUE)
                .body(BodyInserters.fromFormData(requestBody))
                .retrieve().bodyToMono(TokenResponse.class).block();
    }

    private String readRealmImportFile() {
        InputStream input = Thread.currentThread().getContextClassLoader().getResourceAsStream("lf12-realm.json");

        String line;
        StringBuilder builder = new StringBuilder();
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(input))) {
            while ((line = reader.readLine()) != null) {
                builder.append(line);
            }

        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return builder.toString();
    }
}