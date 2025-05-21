package de.szut.lf8_starter.product;


import com.stripe.exception.StripeException;
import de.szut.lf8_starter.user.JwtService;
import de.szut.lf8_starter.transaction.StripeProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/product")
public class ProductController {

    private final StripeProductService stripeService;
    private final JwtService jwtService;

    public ProductController(StripeProductService stripeService, JwtService jwtService) {
        this.stripeService = stripeService;
        this.jwtService = jwtService;
    }

    @GetMapping
    public ResponseEntity<List<ProductWithPriceModel>> getProducts() throws StripeException {
        return ResponseEntity.ok(this.stripeService.getAllProducts());
    }

    @PostMapping("/{bundleId}")
    public ResponseEntity<LinkDto> createBuyLink(@PathVariable String bundleId,
                                                 @RequestBody PaymentLinkCreationOptionsModel paymentLinkCreationModel,
                                                 @RequestHeader(value = "Authorization", required = false) String authorizationHeader) throws Exception {
        var userId = jwtService.decodeId(authorizationHeader);
        return ResponseEntity.ok(new LinkDto(stripeService.createPaymentLink(bundleId, userId, paymentLinkCreationModel.getSuccessUrl(), paymentLinkCreationModel.getCancelUrl())));
    }
}
