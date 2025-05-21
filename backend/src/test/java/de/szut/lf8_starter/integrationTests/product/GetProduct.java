package de.szut.lf8_starter.integrationTests.product;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.szut.lf8_starter.product.ProductWithPriceModel;
import de.szut.lf8_starter.testcontainers.AbstractIntegrationTest;
import org.junit.jupiter.api.Test;
import org.springframework.security.test.context.support.WithMockUser;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class GetProduct extends AbstractIntegrationTest {
    @Test
    void authorization() throws Exception {
        this.mockMvc.perform(get("/product").with(csrf()))
                .andExpect(status().is2xxSuccessful());
    }

    @Test
    @WithMockUser()
    void givenNoId_WhenGettingProduct_ThenReturnAllProducts() throws Exception {
        String productsAsString = this.mockMvc.perform(get("/product").with(csrf()))
                .andExpect(status().is2xxSuccessful())
                .andReturn().getResponse().getContentAsString();
        ProductWithPriceModel[] productsWithPrice= new ObjectMapper().readValue(productsAsString, ProductWithPriceModel[].class);

        List<ProductWithPriceModel> productWithPriceModelList = Arrays.asList(productsWithPrice);
        productWithPriceModelList.sort(Comparator.comparingInt(ProductWithPriceModel::getAmount));

        assertEquals(6, productWithPriceModelList.size());

        ProductWithPriceModel product = productWithPriceModelList.get(0);
        assertEquals(199L, product.getPriceAmount());
        assertEquals("eur", product.getCurrency());
        assertEquals(100, product.getAmount());

        product = productWithPriceModelList.get(1);
        assertEquals(799L, product.getPriceAmount());
        assertEquals("eur", product.getCurrency());
        assertEquals(500, product.getAmount());

        product = productWithPriceModelList.get(2);
        assertEquals(1499L, product.getPriceAmount());
        assertEquals("eur", product.getCurrency());
        assertEquals(1000, product.getAmount());

        product = productWithPriceModelList.get(3);
        assertEquals(6969L, product.getPriceAmount());
        assertEquals("eur", product.getCurrency());
        assertEquals(5000, product.getAmount());

        product = productWithPriceModelList.get(4);
        assertEquals(12999L, product.getPriceAmount());
        assertEquals("eur", product.getCurrency());
        assertEquals(10000, product.getAmount());

        product = productWithPriceModelList.get(5);
        assertEquals(26999L, product.getPriceAmount());
        assertEquals("eur", product.getCurrency());
        assertEquals(25000, product.getAmount());
    }

}