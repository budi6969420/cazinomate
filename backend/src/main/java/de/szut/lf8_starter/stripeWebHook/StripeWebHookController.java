package de.szut.lf8_starter.stripeWebHook;

import com.stripe.Stripe;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.Event;
import com.stripe.model.EventDataObjectDeserializer;
import com.stripe.model.PaymentIntent;
import com.stripe.net.Webhook;
import jakarta.annotation.PostConstruct;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

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

    @PostMapping()
    public ResponseEntity<String> handleStripeWebhook(@RequestBody String payload,
                                                      @RequestHeader("Stripe-Signature") String sigHeader) {
        Event event;

        try {
            event = Webhook.constructEvent(payload, sigHeader, stripeWebhookSecret);
        } catch (SignatureVerificationException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid signature");
        }

        if ("payment_intent.succeeded".equals(event.getType())) {
            EventDataObjectDeserializer dataObjectDeserializer = event.getDataObjectDeserializer();
            Optional<Object> deserializedObject = Optional.ofNullable(dataObjectDeserializer.getObject());

            if (deserializedObject.isPresent()) {
                PaymentIntent paymentIntent = (PaymentIntent) deserializedObject.get();
                handleSuccessfulPayment(paymentIntent);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to deserialize event");
            }
        }

        return ResponseEntity.ok("Webhook received");
    }

    private void handleSuccessfulPayment(PaymentIntent paymentIntent) {
        System.out.println("handleSuccessfulPayment: " + paymentIntent);
    }
}
