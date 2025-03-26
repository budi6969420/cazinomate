package de.szut.lf8_starter.user;

import java.util.Base64;
import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

@Service
public class JwtService {

    private Map<String, Object> decodeJWT(String bearerToken) throws Exception {
        if (bearerToken == null || !bearerToken.startsWith("Bearer ")) {
            throw new Exception("Invalid JWT");
        }

        String token = bearerToken.substring(7);

        String[] parts = token.split("\\.");
        if (parts.length != 3) {
            throw new IllegalArgumentException("Invalid JWT format");
        }

        String payloadJson = new String(Base64.getUrlDecoder().decode(parts[1]));

        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> payload = objectMapper.readValue(payloadJson, Map.class);

        return payload;
    }

    public String decodeId(String token) throws Exception {
        return decodeJWT(token).get("sub").toString();
    }
}
