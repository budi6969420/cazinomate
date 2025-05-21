package de.szut.lf8_starter.user;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.szut.lf8_starter.testcontainers.AbstractIntegrationTest;
import de.szut.lf8_starter.user.dto.ChangePasswordDto;
import de.szut.lf8_starter.user.dto.ChangeUsernameDto;
import org.junit.After;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class PutUser extends AbstractIntegrationTest {
    @BeforeEach
    void setUp() throws Exception {
        super.mockJwtService();
        reimportRealm();
    }

    @Test
    void authorization() throws Exception {
        this.mockMvc.perform(put("/user/password").with(csrf()))
                .andExpect(status().isUnauthorized());
        this.mockMvc.perform(put("/user/username").with(csrf()))
                .andExpect(status().isUnauthorized());
    }

    //@Test
    @WithMockUser()
    void givenTheUserHasAValidTokenAndPassword_whenChangePassword_thenChangePassword() throws Exception {
        ChangePasswordDto passwordDto = new ChangePasswordDto();
        passwordDto.setCurrentPassword("testpassword");
        passwordDto.setPassword("password");

        String payload = new ObjectMapper().writeValueAsString(passwordDto);
        String userData = this.mockMvc.perform(put("/user/password")
                .contentType(MediaType.APPLICATION_JSON).content(payload)
                        .with(csrf()))
                .andExpect(status().is2xxSuccessful())
                .andReturn().getResponse().getContentAsString();
        assertEquals("Password changed successfully", userData);
        assertTrue(validateUserPassword("testuser", "password"));
    }

    @Test
    @WithMockUser()
    void givenTheUserHasAValidTokenAndPassword_whenChangeUsername_thenChangeUsername() throws Exception {
        ChangeUsernameDto usernameDto = new ChangeUsernameDto();
        usernameDto.setUsername("Test");
        usernameDto.setCurrentPassword("testpassword");

        String payload = new ObjectMapper().writeValueAsString(usernameDto);
        this.mockMvc.perform(put("/user/username")
                        .contentType(MediaType.APPLICATION_JSON).content(payload)
                        .with(csrf()))
                .andExpect(status().is2xxSuccessful())
                .andReturn().getResponse().getContentAsString();
        assertTrue(validateUserPassword("Test", "testpassword"));
    }

    @AfterEach
    void teardown() {
        reimportRealm();
    }
}