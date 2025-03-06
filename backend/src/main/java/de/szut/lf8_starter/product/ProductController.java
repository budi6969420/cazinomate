package de.szut.lf8_starter.product;


import com.stripe.exception.StripeException;
import de.szut.lf8_starter.models.ProductWithPriceModel;
import de.szut.lf8_starter.services.JWTService;
import de.szut.lf8_starter.services.KeycloakService;
import de.szut.lf8_starter.services.StripeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/product")
public class ProductController {

    private final StripeService stripeService;
    private final JWTService jwtService;

    public ProductController(StripeService stripeService, JWTService jwtService) {
        this.stripeService = stripeService;
        this.jwtService = jwtService;
    }

    @GetMapping
    public ResponseEntity<List<ProductWithPriceModel>> getProducts() throws StripeException {
        return ResponseEntity.ok(this.stripeService.getAllProducts());
    }

    @PostMapping("/{bundleId}")
    public ResponseEntity<String> createBuyLink(@PathVariable String bundleId,
                                                @RequestBody PaymentLinkCreationOptionsModel paymentLinkCreationModel,
                                                @RequestHeader(value = "Authorization", required = false) String authorizationHeader) throws Exception {
        var userId = jwtService.decodeId(authorizationHeader);
        return ResponseEntity.ok(stripeService.createPaymentLink(bundleId, userId, paymentLinkCreationModel.getSuccessUrl(), paymentLinkCreationModel.getCancelUrl()));
    }
}
