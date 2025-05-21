package de.szut.lf8_starter.paymentProvider.paymentProviders;

import de.szut.lf8_starter.paymentProvider.BasePaymentProvider;

public class VisaPaymentProvider extends BasePaymentProvider {
    @Override
    public String getId() {
        return "c10363a0-bfa8-4e45-8f80-97ba2884d631";
    }

    @Override
    public String getName() {
        return "Visa";
    }

    @Override
    public String getImageUrl() {
        return "https://cdn.budidev.de/bb3af";
    }

    @Override
    public String getUrl() {
        return "https://www.visa.de/";
    }
}
