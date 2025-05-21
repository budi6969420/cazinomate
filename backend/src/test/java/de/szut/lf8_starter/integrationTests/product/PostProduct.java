package de.szut.lf8_starter.integrationTests.product;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.szut.lf8_starter.product.PaymentLinkCreationOptionsModel;
import de.szut.lf8_starter.testcontainers.AbstractIntegrationTest;
import de.szut.lf8_starter.user.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;

import java.net.URL;

import static org.junit.jupiter.api.Assertions.fail;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class PostProduct extends AbstractIntegrationTest {
    @Test
    void authorization() throws Exception {
        this.mockMvc.perform(post("/product/prod_SBKlhbUBNmTbUI").with(csrf()))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser()
    void givenValidBundleId_WhenCreatingBuyLink_ThenReturnValidLink() throws Exception {
        PaymentLinkCreationOptionsModel options = new PaymentLinkCreationOptionsModel();
        options.setCancelUrl("https://test.com");
        options.setSuccessUrl("https://test.com");

        String payload = new ObjectMapper().writeValueAsString(options);
        String buyLink = this.mockMvc.perform(post("/product/prod_SBKlhbUBNmTbUI")
                        .contentType(MediaType.APPLICATION_JSON).content(payload)
                        .with(csrf()))
                .andExpect(status().is2xxSuccessful())
                .andReturn().getResponse().getContentAsString();
        try {
            buyLink = buyLink.replace("{\"url\":\"", "");
            buyLink = buyLink.replace("\"}", "");
            new URL(buyLink).toURI();
        }catch (Exception e) {
            fail();
        }
    }
}
