package de.szut.lf8_starter.payout;

import de.szut.lf8_starter.email.BaseEmailFormattingService;
import org.springframework.stereotype.Service;

@Service
public class PayoutReceiptEmailFormattingService extends BaseEmailFormattingService<PayoutItemCouponModel> {
    protected PayoutReceiptEmailFormattingService() {
        super(PayoutItemCouponModel.class);
    }

    @Override
    protected String getInnerHtml(Object emailContent) {
        var model = (PayoutItemCouponModel) emailContent;
        var meta = model.getPayoutItemMetaData();

        return """
                <div style='align-items: center; text-align: center; padding: 10px;'>
                    <h2 style='color: #16B858; font-size: 20px; margin-bottom: 15px;'>%s</h2>
                    <p style='color: #c5c5c5; font-size: 16px; margin-bottom: 10px;'>
                        Gutscheincode: <span style='font-weight: bold; color: white;'>%s</span>
                    </p>
                    <p style='color: #c5c5c5; font-size: 16px;'>
                        Summe: <span style='color: white; font-weight: bold;'>%d MateCoins</span>
                    </p>
                </div>
                """.formatted(
                    meta.getName(),
                    model.getCouponCode(),
                    meta.getCost()
        );
    }
}
