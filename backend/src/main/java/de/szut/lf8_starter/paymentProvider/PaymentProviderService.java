package de.szut.lf8_starter.paymentProvider;

import de.szut.lf8_starter.paymentProvider.paymentProviders.PaypalPaymentProvider;
import de.szut.lf8_starter.paymentProvider.paymentProviders.MasterCardPaymentProvider;
import de.szut.lf8_starter.paymentProvider.paymentProviders.KlarnaPaymentProvider;
import de.szut.lf8_starter.paymentProvider.paymentProviders.VisaPaymentProvider;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentProviderService {
    private List<IPaymentProvider> paymentProviders = List.of(
            new PaypalPaymentProvider(),
            new KlarnaPaymentProvider(),
            new MasterCardPaymentProvider(),
            new VisaPaymentProvider());

    public List<PaymentProviderMetadata> getAllPaymentProvidersMetadata() {
        return paymentProviders.stream().map(IPaymentProvider::getMetadata).toList();
    }
}
