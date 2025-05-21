package de.szut.lf8_starter.integrationTests.payout;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.szut.lf8_starter.payout.PayoutItemCouponModel;
import de.szut.lf8_starter.payout.PayoutItemMetaData;
import de.szut.lf8_starter.payout.PurchasePayoutItemDto;
import de.szut.lf8_starter.testcontainers.AbstractIntegrationTest;
import de.szut.lf8_starter.user.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class PostPayout extends AbstractIntegrationTest {
    @BeforeEach
    void setUp() {
        when(mockedTransactionService.tryAddTransaction(anyString(), anyInt(), any(), anyString())).thenReturn(true);
    }

    @Test
    void authentication() throws Exception {
        this.mockMvc.perform(post("/payout").with(csrf()))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser()
    void givenValidUserAndProductId_whenPurchasePayoutItem_thenBuyItem() throws Exception {
        PurchasePayoutItemDto options = new PurchasePayoutItemDto();
        options.setId("fed36825-72f5-4334-beb6-1a5fa1728a80");

        String payload = new ObjectMapper().writeValueAsString(options);
        this.mockMvc.perform(post("/payout")
                        .contentType(MediaType.APPLICATION_JSON).content(payload)
                        .with(csrf()))
                .andExpect(status().is2xxSuccessful());
        verify(mockedSendEmail).sendEmail(emailCaptor.capture(), userCaptor.capture(), anyString());

        PayoutItemCouponModel sendCupon = emailCaptor.getValue();
        User recipient = userCaptor.getValue();

        assertNotNull(sendCupon);
        assertNotNull(recipient);

        assertFalse(sendCupon.getCouponCode().isBlank());
        PayoutItemMetaData payoutItemMetaData = sendCupon.getPayoutItemMetaData();

        assertEquals("fed36825-72f5-4334-beb6-1a5fa1728a80", payoutItemMetaData.getId());
        assertEquals("6er Rum", payoutItemMetaData.getName());
        assertEquals(6850, payoutItemMetaData.getCost());
        assertEquals("https://cdn.budidev.de/924e6", payoutItemMetaData.getImageUrl());

        assertEquals("12345678-1234-1234-1234-123456789abc", recipient.getId());
        assertEquals("testuser", recipient.getUsername());
        assertEquals("test@test.com", recipient.getEmail());
    }
}
