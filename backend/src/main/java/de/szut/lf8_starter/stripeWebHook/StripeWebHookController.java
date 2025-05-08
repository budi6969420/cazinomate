package de.szut.lf8_starter.stripeWebHook;

import com.stripe.Stripe;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import com.stripe.model.Event;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import de.szut.lf8_starter.services.StripeService;
import de.szut.lf8_starter.transaction.TransactionService;
import jakarta.annotation.PostConstruct;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;

@RequestMapping(value = "api/stripe-webhook")
@RestController
public class StripeWebHookController {

    private final StripeService stripeService;
    private final TransactionService transactionService;

    @Value("${stripe.secret.key}")
    private String stripeSecretKey;

    @Value("${stripe.webhook.secret}")
    private String stripeWebhookSecret;

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeSecretKey;
    }

    public StripeWebHookController(StripeService stripeService, TransactionService transactionService) {
        this.stripeService = stripeService;
        this.transactionService = transactionService;
    }

    @PostMapping
    public ResponseEntity<String> handleStripeWebhook(@RequestBody String payload,
                                                      @RequestHeader("Stripe-Signature") String sigHeader) throws StripeException {
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


    private void handleCompletedSession(Session session) throws StripeException {
        String productId = session.getMetadata().get("productId");
        String userId = session.getMetadata().get("userId");

        var product = stripeService.getProductById(productId);
        transactionService.TryAddTransaction(userId, product.getAmount());
    }
}
