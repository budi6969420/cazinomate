package de.szut.lf8_starter.product;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stripe.model.Price;
import com.stripe.model.Product;
import lombok.Data;

import java.util.Map;
import java.util.Objects;

@Data
public class ProductWithPriceModel {
    private String productId;
    private String name;
    private long priceAmount;
    private String currency;
    private int amount;
    private boolean isRecommended;
    private String imageUrl;

    public ProductWithPriceModel(Product product, Price price) {
        this.productId = product.getId();
        this.name = product.getName();

        try {
            var map = new ObjectMapper().readValue(product.getDescription(), Map.class);
            this.amount = Integer.parseInt(map.get("count").toString());
            this.isRecommended = map.get("isRecommended").toString().equals("true");

            var images = product.getImages();
            if (images != null && !images.isEmpty()) {
                this.imageUrl = images.getFirst();
            }
        }
        catch (JsonProcessingException e) {
            System.out.println(e.getMessage());
        }

        if (price != null) {
            this.priceAmount = price.getUnitAmount();
            this.currency = price.getCurrency();
        }
    }
}
