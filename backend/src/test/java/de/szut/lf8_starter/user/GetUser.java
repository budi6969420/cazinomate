package de.szut.lf8_starter.user;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.szut.lf8_starter.testcontainers.AbstractIntegrationTest;
import de.szut.lf8_starter.transaction.TransactionCategory;
import de.szut.lf8_starter.transaction.TransactionDto;
import de.szut.lf8_starter.transaction.TransactionModel;
import org.junit.jupiter.api.Test;
import org.springframework.security.test.context.support.WithMockUser;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class GetUser extends AbstractIntegrationTest {
    @Test
    void authorization() throws Exception {
        this.mockMvc.perform(get("/user/self").with(csrf()))
                .andExpect(status().isUnauthorized());
        this.mockMvc.perform(get("/user/self/balance").with(csrf()))
                .andExpect(status().isUnauthorized());
        this.mockMvc.perform(get("/user/self/transactions").with(csrf()))
                .andExpect(status().isUnauthorized());
        this.mockMvc.perform(get("/user/123456789").with(csrf()))
                .andExpect(status().isUnauthorized());
        this.mockMvc.perform(get("/user/balance").with(csrf()))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser()
    void givenTheUserHasAValidToken_whenGetSelfInfo_thenReturnValidUserData() throws Exception {
        String userData = this.mockMvc.perform(get("/user/self"))
                .andExpect(status().is2xxSuccessful())
                .andReturn().getResponse().getContentAsString();
        User returnedUser = new ObjectMapper().readValue(userData, User.class);

        assertEquals("12345678-1234-1234-1234-123456789abc", returnedUser.getId());

        assertEquals("12345678-1234-1234-1234-123456789abc", returnedUser.getId());
        assertEquals("testuser", returnedUser.getUsername());
        assertEquals("test@test.com", returnedUser.getEmail());
    }

    @Test
    @WithMockUser()
    void givenTheUserHasAValidTokenAndTransactions_whenGetSelfBalance_thenReturnSumOfTransactions() throws Exception {
        TransactionModel transactionModel = new TransactionModel();
        transactionModel.setUserId("12345678-1234-1234-1234-123456789abc");
        transactionModel.setAmount(1000);
        transactionRepository.save(transactionModel);

        transactionModel = new TransactionModel();
        transactionModel.setUserId("12345678-1234-1234-1234-123456789abc");
        transactionModel.setAmount(1000);
        transactionRepository.save(transactionModel);

        assertEquals(2, transactionRepository.findAll().size());

        String balanceDtoData = this.mockMvc.perform(get("/user/self/balance"))
                .andExpect(status().is2xxSuccessful())
                .andReturn().getResponse().getContentAsString();

        assertTrue(balanceDtoData.contains("2000"));

        transactionModel = new TransactionModel();
        transactionModel.setUserId("12345678-1234-1234-1234-123456789abc");
        transactionModel.setAmount(-1000);
        transactionRepository.save(transactionModel);

        transactionModel = new TransactionModel();
        transactionModel.setUserId("12345678-1234-1234-1234-123456789abc");
        transactionModel.setAmount(-1000);
        transactionRepository.save(transactionModel);

        assertEquals(4, transactionRepository.findAll().size());

        balanceDtoData = this.mockMvc.perform(get("/user/self/balance")
                        .with(csrf()))
                .andExpect(status().is2xxSuccessful())
                .andReturn().getResponse().getContentAsString();

        assertEquals("{\"balance\":0}", balanceDtoData);
    }

    @Test
    @WithMockUser()
    void givenTheUserHasAValidTokenAndTransactions_whenGetSelfTransactions_thenReturnTransactions() throws Exception {
        TransactionModel transactionModel = new TransactionModel();
        transactionModel.setUserId("12345678-1234-1234-1234-123456789abc");
        transactionModel.setAmount(1000);
        transactionModel.setCategory(TransactionCategory.None);
        transactionRepository.save(transactionModel);

        transactionModel = new TransactionModel();
        transactionModel.setUserId("12345678-1234-1234-1234-123456789abc");
        transactionModel.setAmount(1000);
        transactionModel.setCategory(TransactionCategory.None);
        transactionRepository.save(transactionModel);

        transactionModel = new TransactionModel();
        transactionModel.setUserId("12345678-1234-1234-1234-123456789abc");
        transactionModel.setAmount(-1000);
        transactionModel.setCategory(TransactionCategory.None);
        transactionRepository.save(transactionModel);

        transactionModel = new TransactionModel();
        transactionModel.setUserId("12345678-1234-1234-1234-123456789abc");
        transactionModel.setAmount(-1000);
        transactionModel.setCategory(TransactionCategory.None);
        transactionRepository.save(transactionModel);

        String response = this.mockMvc.perform(get("/user/self/transactions")
                        .with(csrf()))
                .andExpect(status().is2xxSuccessful())
                .andReturn().getResponse().getContentAsString();

        TransactionDto[] transactions = new ObjectMapper().readValue(response, TransactionDto[].class);

        List<TransactionDto> transactionList = Arrays.asList(transactions);
        transactionList.sort(Comparator.comparingInt(TransactionDto::getAmount));
        transactionList = transactionList.reversed();

        assertEquals(4, transactionList.size());

        assertTrue(transactionList.get(0).getId() > 0);
        assertEquals(1000, transactionList.get(0).getAmount());
        assertEquals(TransactionCategory.None.name(), transactionList.get(0).getCategory());
        assertNull(transactionList.get(0).getDescription());

        assertTrue(transactionList.get(1).getId() > 0);
        assertEquals(1000, transactionList.get(1).getAmount());
        assertEquals(TransactionCategory.None.toString(), transactionList.get(1).getCategory());
        assertNull(transactionList.get(1).getDescription());

        assertTrue(transactionList.get(2).getId() > 0);
        assertEquals(-1000, transactionList.get(2).getAmount());
        assertEquals(TransactionCategory.None.toString(), transactionList.get(2).getCategory());
        assertNull(transactionList.get(2).getDescription());

        assertTrue(transactionList.get(3).getId() > 0);
        assertEquals(-1000, transactionList.get(3).getAmount());
        assertEquals(TransactionCategory.None.toString(), transactionList.get(3).getCategory());
        assertNull(transactionList.get(3).getDescription());
    }

    @Test
    @WithMockUser()
    void givenAValidToken_whenGetInfo_thenReturnValidUserData() throws Exception {
        String userData = this.mockMvc.perform(get("/user/12345678-1234-1234-1234-123456789abc")
                        .with(csrf()))
                .andExpect(status().is2xxSuccessful())
                .andReturn().getResponse().getContentAsString();
        User returnedUser = new ObjectMapper().readValue(userData, User.class);

        assertEquals("12345678-1234-1234-1234-123456789abc", returnedUser.getId());
        assertEquals("testuser", returnedUser.getUsername());
        assertEquals("test@test.com", returnedUser.getEmail());
    }

    @Test
    @WithMockUser()
    void givenAValidTokenAndTransactions_whenGetBalance_thenReturnSumOfTransactions() throws Exception {
        TransactionModel transactionModel = new TransactionModel();
        transactionModel.setUserId("12345678-1234-1234-1234-123456789abc");
        transactionModel.setAmount(1000);
        transactionRepository.save(transactionModel);

        transactionModel = new TransactionModel();
        transactionModel.setUserId("12345678-1234-1234-1234-123456789abc");
        transactionModel.setAmount(1000);
        transactionRepository.save(transactionModel);

        String balanceDtoData =this.mockMvc.perform(get("/user/12345678-1234-1234-1234-123456789abc/balance")
                        .with(csrf()))
                .andExpect(status().is2xxSuccessful())
                .andReturn().getResponse().getContentAsString();

        assertTrue(balanceDtoData.contains("2000"));

        transactionModel = new TransactionModel();
        transactionModel.setUserId("12345678-1234-1234-1234-123456789abc");
        transactionModel.setAmount(1000);
        transactionRepository.save(transactionModel);

        transactionModel = new TransactionModel();
        transactionModel.setUserId("12345678-1234-1234-1234-123456789abc");
        transactionModel.setAmount(-1000);
        transactionRepository.save(transactionModel);

        balanceDtoData =this.mockMvc.perform(get("/user/self/balance"))
                .andExpect(status().is2xxSuccessful())
                .andReturn().getResponse().getContentAsString();

        assertTrue(balanceDtoData.contains("0"));
    }
}