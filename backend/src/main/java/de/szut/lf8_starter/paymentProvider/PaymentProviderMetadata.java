package de.szut.lf8_starter.paymentProvider;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PaymentProviderMetadata {
    private String id;

    private String name;
    private String imageUrl;
    private String url;
}
