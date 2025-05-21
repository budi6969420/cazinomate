package de.szut.lf8_starter.paymentProvider;

public interface IPaymentProvider {
    String getId();
    String getName();
    String getImageUrl();
    String getUrl();

    PaymentProviderMetadata getMetadata();
}
