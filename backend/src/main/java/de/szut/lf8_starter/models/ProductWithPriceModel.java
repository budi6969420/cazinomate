package de.szut.lf8_starter.models;

import com.stripe.model.Price;
import com.stripe.model.Product;
import lombok.Data;

@Data
public class ProductWithPriceModel {
    private String productId;
    private String name;
    private String description;
    private String priceId;
    private long priceAmount;
    private String currency;

    public ProductWithPriceModel(Product product, Price price) {
        this.productId = product.getId();
        this.name = product.getName();
        this.description = product.getDescription();
        if (price != null) {
            this.priceId = price.getId();
            this.priceAmount = price.getUnitAmount();
            this.currency = price.getCurrency();
        }
    }
}
