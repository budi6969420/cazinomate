package de.szut.lf8_starter.stripeWebHook;

import com.stripe.Stripe;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.Event;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import jakarta.annotation.PostConstruct;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;

@RequestMapping(value = "api/stripe-webhook")
@RestController
public class StripeWebHookController {

    @Value("${stripe.secret.key}")
    private String stripeSecretKey;

    @Value("${stripe.webhook.secret}")
    private String stripeWebhookSecret;

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeSecretKey;
    }


    @PostMapping
    public ResponseEntity<String> handleStripeWebhook(@RequestBody String payload,
                                                      @RequestHeader("Stripe-Signature") String sigHeader) {
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


    private void handleCompletedSession(Session session) {
        String productId = session.getMetadata().get("productId");
        if (productId != null) {
            System.out.println("Product ID: " + productId);
        } else {
            System.out.println("No product ID found in metadata");
        }

        String userId = session.getMetadata().get("userId");
        if (userId != null) {
            System.out.println("User ID: " + userId);
        } else {
            System.out.println("No user ID found in metadata");
        }
    }
}
