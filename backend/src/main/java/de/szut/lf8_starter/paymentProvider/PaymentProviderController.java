package de.szut.lf8_starter.paymentProvider;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "api/payment-provider")
public class PaymentProviderController {

    private final PaymentProviderService paymentProviderService;

    public PaymentProviderController(PaymentProviderService paymentProviderService) {
        this.paymentProviderService = paymentProviderService;
    }

    @GetMapping
    public ResponseEntity<List<PaymentProviderMetadata>> getPaymentProviders() {
        return ResponseEntity.ok(this.paymentProviderService.getAllPaymentProvidersMetadata());
    }
}
