package de.szut.lf8_starter.services;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Price;
import com.stripe.model.PriceCollection;
import com.stripe.model.Product;
import com.stripe.model.ProductCollection;
import com.stripe.model.checkout.Session;
import com.stripe.param.PriceListParams;
import com.stripe.param.ProductListParams;
import com.stripe.param.checkout.SessionCreateParams;
import de.szut.lf8_starter.product.ProductWithPriceModel;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class StripeService {

    @Value("${stripe.secret.key}")
    private String stripeSecretKey;

    public StripeService() {
        Stripe.apiKey = stripeSecretKey;
    }

    public String createPaymentLink(String productId, String userId, String successUrl, String cancelUrl) throws StripeException {
        var product = getProductById(productId);
        try {

            SessionCreateParams params = SessionCreateParams.builder()
                    .addLineItem(
                            SessionCreateParams.LineItem.builder()
                                    .setPriceData(
                                            SessionCreateParams.LineItem.PriceData.builder()
                                                    .setCurrency(product.getCurrency())
                                                    .setUnitAmount(product.getPriceAmount())
                                                    .setProductData(
                                                            SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                    .setName("Coin Bundle")
                                                                    .build())
                                                    .build())
                                    .setQuantity(1L)
                                    .build())
                    .setMode(SessionCreateParams.Mode.PAYMENT)
                    .putMetadata("productId", productId)
                    .putMetadata("userId", userId)
                    .setSuccessUrl(successUrl)
                    .setCancelUrl(cancelUrl)
                    .build();

            Session session = Session.create(params);

            return session.getUrl();
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error creating payment link", e);
        }
    }

    public List<ProductWithPriceModel> getAllProducts() throws StripeException {
        ProductListParams productParams = ProductListParams.builder().setLimit(20L).build();
        ProductCollection products = Product.list(productParams);

        PriceListParams priceParams = PriceListParams.builder().setLimit(20L).build();
        PriceCollection prices = Price.list(priceParams);

        Map<String, Price> priceMap = new HashMap<>();
        for (Price price : prices.getData()) {
            priceMap.put(price.getProduct(), price);
        }

        return products.getData().stream()
                .map(product -> new ProductWithPriceModel(product, priceMap.get(product.getId())))
                .toList();
    }

    public ProductWithPriceModel getProductById(String productId) throws StripeException {
        Product product = Product.retrieve(productId);

        PriceListParams params = PriceListParams.builder()
                .setProduct(productId)
                .setLimit(1L)
                .build();

        List<Price> prices = Price.list(params).getData();

        Price price = prices.isEmpty() ? null : prices.getFirst();

        return new ProductWithPriceModel(product, price);
    }
}
