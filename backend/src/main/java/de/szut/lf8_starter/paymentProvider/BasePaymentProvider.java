package de.szut.lf8_starter.paymentProvider;

public abstract class BasePaymentProvider implements IPaymentProvider {
    @Override
    public PaymentProviderMetadata getMetadata() {
        return new PaymentProviderMetadata(getId(), getName(), getImageUrl(), getUrl());
    }
}
