package de.szut.lf8_starter.payout;

import de.szut.lf8_starter.email.EmailSendingService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class PayoutReceiptEmailSendingService extends EmailSendingService {
    public PayoutReceiptEmailSendingService(            @Value("${email.address}") String emailAddress,
                                                        @Value("${spring.application.name}") String companyName,
                                                        @Value("${email.API_KEY}") String apiKey,
                                                        @Value("${email.API_SECRET}") String apiSecret,
                                                        PayoutReceiptEmailFormattingService emailFormattingService) {
        super(emailAddress, companyName, apiKey, apiSecret, emailFormattingService);
    }
}
