package de.szut.lf8_starter.integrationTests.game;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.szut.lf8_starter.game.GameMetadata;
import de.szut.lf8_starter.testcontainers.AbstractIntegrationTest;
import org.junit.jupiter.api.Test;
import org.springframework.security.test.context.support.WithMockUser;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class GetGame extends AbstractIntegrationTest {
    @Test
    void authorization() throws Exception {
        this.mockMvc.perform(get("/game/crossy-road").with(csrf()))
                .andExpect(status().isUnauthorized());
        this.mockMvc.perform(get("/game").with(csrf()))
                .andExpect(status().is2xxSuccessful());
    }

    @Test
    @WithMockUser()
    void givenValidGameId_WhenGettingGameMetaData_ThenReturnValidMetaData() throws Exception {
        String gameMetadataAsString = this.mockMvc.perform(get("/game/crossy-road").with(csrf()))
                .andExpect(status().is2xxSuccessful())
                .andReturn().getResponse().getContentAsString();
        GameMetadata metadata = new ObjectMapper().readValue(gameMetadataAsString, GameMetadata.class);

        assertEquals("crossy-road", metadata.getId());
        assertEquals("Crossy Road", metadata.getTitle());
        assertFalse(metadata.getPreviewImageUrl().isBlank());
    }

    @Test
    void givenNoId_WhenGettingGameMetaData_ThenReturnAllGames() throws Exception {
        String gameMetadataAsString = this.mockMvc.perform(get("/game").with(csrf()))
                .andExpect(status().is2xxSuccessful())
                .andReturn().getResponse().getContentAsString();
        GameMetadata[] metadata = new ObjectMapper().readValue(gameMetadataAsString, GameMetadata[].class);

        assertEquals(3, metadata.length);
        assertEquals("crossy-road", metadata[0].getId());
        assertEquals("Crossy Road", metadata[0].getTitle());
        assertFalse(metadata[0].getPreviewImageUrl().isBlank());

        assertEquals("slots", metadata[1].getId());
        assertEquals("The Lucky Crewmate", metadata[1].getTitle());
        assertFalse(metadata[1].getPreviewImageUrl().isBlank());

        assertEquals("coin-flip", metadata[2].getId());
        assertEquals("Flip The Coin", metadata[2].getTitle());
        assertFalse(metadata[2].getPreviewImageUrl().isBlank());
    }
}
