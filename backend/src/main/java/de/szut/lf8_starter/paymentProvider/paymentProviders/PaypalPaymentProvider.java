package de.szut.lf8_starter.paymentProvider.paymentProviders;

import de.szut.lf8_starter.paymentProvider.BasePaymentProvider;

public class PaypalPaymentProvider extends BasePaymentProvider {
    @Override
    public String getId() {
        return "a66a2208-f500-4512-91c2-b8f0b1ab5c81";
    }

    @Override
    public String getName() {
        return "Paypal";
    }

    @Override
    public String getImageUrl() {
        return "https://cdn.budidev.de/b2716";
    }

    @Override
    public String getUrl() {
        return "https://www.paypal.com/de/home/";
    }
}
