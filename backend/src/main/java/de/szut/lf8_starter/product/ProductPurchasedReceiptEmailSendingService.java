package de.szut.lf8_starter.product;

import de.szut.lf8_starter.email.EmailSendingService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class ProductPurchasedReceiptEmailSendingService extends EmailSendingService {
    public ProductPurchasedReceiptEmailSendingService(@Value("${email.api.address}") String emailAddress,
                                                      @Value("${spring.application.name}") String companyName,
                                                      @Value("${email.api.key}") String apiKey,
                                                      @Value("${email.api.secret}") String apiSecret, ProductPurchasedReceiptFormattingService emailFormattingService) {
        super(emailAddress, companyName, apiKey, apiSecret, emailFormattingService);
    }
}
