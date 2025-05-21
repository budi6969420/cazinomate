package de.szut.lf8_starter.integrationTests.payout;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.szut.lf8_starter.payout.PayoutItemMetaData;
import de.szut.lf8_starter.testcontainers.AbstractIntegrationTest;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class GetPayout extends AbstractIntegrationTest {
    @Test
    void authorization() throws Exception {
        this.mockMvc.perform(get("/payout").with(csrf()))
                .andExpect(status().is2xxSuccessful());
    }

    @Test
    void givenNoId_whenGettingPayouts_thenReturnAllPayouts() throws Exception {
        String response = this.mockMvc.perform(get("/payout").with(csrf()))
                .andExpect(status().is2xxSuccessful()).andReturn().getResponse().getContentAsString();

        PayoutItemMetaData[] payouts = new ObjectMapper().readValue(response, PayoutItemMetaData[].class);

        List<PayoutItemMetaData> payoutList = Arrays.asList(payouts);
        payoutList.sort(Comparator.comparingInt(PayoutItemMetaData::getCost));

        assertEquals(6, payoutList.size());

        assertEquals("ea8b2ebd-7f9c-425d-872a-abbb8277e790", payoutList.get(0).getId());
        assertEquals("6er Bier", payoutList.get(0).getName());
        assertEquals(550, payoutList.get(0).getCost());
        assertEquals("https://cdn.budidev.de/efb25", payoutList.get(0).getImageUrl());

        assertEquals("657ab94d-d36d-458c-ac1a-05056b4fafa6", payoutList.get(1).getId());
        assertEquals("Vodka", payoutList.get(1).getName());
        assertEquals(950, payoutList.get(1).getCost());
        assertEquals("https://cdn.budidev.de/2d8b4", payoutList.get(1).getImageUrl());

        assertEquals("beae6369-1d86-4177-a878-3c80b18c0f46", payoutList.get(2).getId());
        assertEquals("Rum", payoutList.get(2).getName());
        assertEquals(1250, payoutList.get(2).getCost());
        assertEquals("https://cdn.budidev.de/a2dd2", payoutList.get(2).getImageUrl());

        assertEquals("95b82fd0-9cc0-4b7e-ad17-d30c05e46c1a", payoutList.get(3).getId());
        assertEquals("6er Jacky Cola", payoutList.get(3).getName());
        assertEquals(1750, payoutList.get(3).getCost());
        assertEquals("https://cdn.budidev.de/11b27", payoutList.get(3).getImageUrl());

        assertEquals("9383876f-e37d-48c6-ad15-38964e7e0b33", payoutList.get(4).getId());
        assertEquals("6er Vodka", payoutList.get(4).getName());
        assertEquals(5250, payoutList.get(4).getCost());
        assertEquals("https://cdn.budidev.de/3dc03", payoutList.get(4).getImageUrl());

        assertEquals("fed36825-72f5-4334-beb6-1a5fa1728a80", payoutList.get(5).getId());
        assertEquals("6er Rum", payoutList.get(5).getName());
        assertEquals(6850, payoutList.get(5).getCost());
        assertEquals("https://cdn.budidev.de/924e6", payoutList.get(5).getImageUrl());
    }
}
