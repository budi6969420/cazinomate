package de.szut.lf8_starter.paymentProvider.paymentProviders;

import de.szut.lf8_starter.paymentProvider.BasePaymentProvider;

public class MasterCardPaymentProvider extends BasePaymentProvider {
    @Override
    public String getId() {
        return "1edc44b9-99c9-4356-9df4-46a1444abb66";
    }

    @Override
    public String getName() {
        return "MasterCard";
    }

    @Override
    public String getImageUrl() {
        return "https://cdn.budidev.de/6a6f0";
    }

    @Override
    public String getUrl() {
            return "https://mastercard.de/";
    }
}
