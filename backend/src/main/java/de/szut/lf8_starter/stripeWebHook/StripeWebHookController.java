package de.szut.lf8_starter.stripeWebHook;

import de.szut.lf8_starter.product.ProductPurchasedReceiptEmailSendingService;
import de.szut.lf8_starter.transaction.StripeService2ElectricBoogaloo;
import com.stripe.Stripe;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import com.stripe.model.Event;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import de.szut.lf8_starter.transaction.TransactionCategory;
import de.szut.lf8_starter.transaction.TransactionService;
import de.szut.lf8_starter.user.KeycloakService;
import jakarta.annotation.PostConstruct;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;

@RequestMapping(value = "stripe-webhook")
@RestController
public class StripeWebHookController {

    private final StripeService2ElectricBoogaloo stripeService;
    private final TransactionService transactionService;
    private final KeycloakService keycloakService;
    private final ProductPurchasedReceiptEmailSendingService productPurchasedReceiptEmailSendingService;

    @Value("${stripe.secret.key}")
    private String stripeSecretKey;

    @Value("${stripe.webhook.secret}")
    private String stripeWebhookSecret;

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeSecretKey;
    }

    public StripeWebHookController(StripeService2ElectricBoogaloo stripeService, TransactionService transactionService, KeycloakService keycloakService, ProductPurchasedReceiptEmailSendingService productPurchasedReceiptEmailSendingService) {
        this.stripeService = stripeService;
        this.transactionService = transactionService;
        this.keycloakService = keycloakService;
        this.productPurchasedReceiptEmailSendingService = productPurchasedReceiptEmailSendingService;
    }

    @PostMapping
    public ResponseEntity<String> handleStripeWebhook(@RequestBody String payload,
                                                      @RequestHeader("Stripe-Signature") String sigHeader) throws Exception {
        Event event;

        try {
            event = Webhook.constructEvent(payload, sigHeader, stripeWebhookSecret);
        } catch (SignatureVerificationException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid signature");
        }

        if ("checkout.session.completed".equals(event.getType())) {
            handleCompletedSession((Session) event.getData().getObject());
        }

        return ResponseEntity.ok("Webhook received");
    }


    private void handleCompletedSession(Session session) throws Exception {
        var productId = session.getMetadata().get("productId");
        var userId = session.getMetadata().get("userId");
        var user = this.keycloakService.getUserData(userId);

        var product = stripeService.getProductById(productId);
        transactionService.TryAddTransaction(userId, product.getAmount(), TransactionCategory.Payment, "1x ".concat(product.getName()));
        this.productPurchasedReceiptEmailSendingService.sendEmail(product, user, "Kaufbestätigung");
    }
}
