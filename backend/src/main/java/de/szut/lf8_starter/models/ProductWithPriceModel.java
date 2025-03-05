package de.szut.lf8_starter.models;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stripe.model.Price;
import com.stripe.model.Product;
import lombok.Data;

import java.util.Map;

@Data
public class ProductWithPriceModel {
    private String productId;
    private String name;
    private String priceId;
    private long priceAmount;
    private String currency;
    private int amount;
    private String isRecommended;

    public ProductWithPriceModel(Product product, Price price) {
        this.productId = product.getId();
        this.name = product.getName();

        try {
            var map = new ObjectMapper().readValue(product.getDescription(), Map.class);
            this.amount = Integer.parseInt(map.get("amount").toString());
            this.isRecommended = map.get("isRecommended").toString();
        }
        catch (JsonProcessingException e) {
            System.out.println(e.getMessage());
        }

        if (price != null) {
            this.priceId = price.getId();
            this.priceAmount = price.getUnitAmount();
            this.currency = price.getCurrency();
        }
    }
}
