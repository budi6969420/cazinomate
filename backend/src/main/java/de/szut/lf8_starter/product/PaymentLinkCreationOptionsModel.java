package de.szut.lf8_starter.product;

import lombok.Data;

@Data
public class PaymentLinkCreationOptionsModel {
    private String successUrl;
    private String cancelUrl;
}
