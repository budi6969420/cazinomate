package de.szut.lf8_starter.integrationTests.sponsors;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.szut.lf8_starter.sponsor.ISponsor;
import de.szut.lf8_starter.testcontainers.AbstractIntegrationTest;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class GetSponsor extends AbstractIntegrationTest {
    @Test
    void authorization() throws Exception {
        this.mockMvc.perform(get("/sponsor").with(csrf()))
                .andExpect(status().is2xxSuccessful());
    }

    @Test
    void givenNoId_WhenGettingSponsors_ThenReturnAllSponsors() throws Exception {
        String sponsorsAsString = this.mockMvc.perform(get("/sponsor").with(csrf()))
                .andExpect(status().is2xxSuccessful())
                .andReturn().getResponse().getContentAsString();

        assertTrue(sponsorsAsString.contains("Goenergy"));
        assertTrue(sponsorsAsString.contains("Prime"));
        assertTrue(sponsorsAsString.contains("OnlyFans"));
        assertTrue(sponsorsAsString.contains("prodBrns"));
    }
}