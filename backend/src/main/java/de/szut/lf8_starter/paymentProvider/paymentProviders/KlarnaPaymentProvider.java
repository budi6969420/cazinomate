package de.szut.lf8_starter.paymentProvider.paymentProviders;

import de.szut.lf8_starter.paymentProvider.BasePaymentProvider;

public class KlarnaPaymentProvider extends BasePaymentProvider {
    @Override
    public String getId() {
        return "e177dc68-fa74-4523-a050-1aea8c2fe302";
    }

    @Override
    public String getName() {
        return "Klarna";
    }

    @Override
    public String getImageUrl() {
        return "https://cdn.budidev.de/a6e8b";
    }

    @Override
    public String getUrl() {
        return "https://www.klarna.com/de/";
    }
}
