package de.szut.lf8_starter.product;

import de.szut.lf8_starter.email.BaseEmailFormattingService;
import org.springframework.stereotype.Service;

@Service
public class ProductPurchasedReceiptFormattingService extends BaseEmailFormattingService<ProductWithPriceModel> {
    protected ProductPurchasedReceiptFormattingService() {
        super(ProductWithPriceModel.class);
    }

    @Override
    protected String getInnerHtml(Object emailContent) {
        if (!(emailContent instanceof ProductWithPriceModel model)) {
            throw new IllegalArgumentException("Invalid email content type");
        }

        return """
        <div align-items: center; text-align: center; padding: 10px;'>
        
            <h2 style='color: white; font-size: 22px; margin-bottom: 10px;'>Kaufbestätigung:</h2>
            <h2 style='color: #16B858; font-size: 20px; margin-bottom: 15px;'>1x %s</h2>
            <p style='color: #c5c5c5; font-size: 16px; margin-bottom: 10px;'>
                <span style='color: white; font-weight: bold;'>%d</span> MateCoins
            </p>
            <p style='color: #c5c5c5; font-size: 16px; margin-bottom: 10px;'>
                Preis: <span style='color: white; font-weight: bold;'>%.2f %s</span>
            </p>
            %s
        </div>
        """.formatted(
                model.getName(),
                model.getAmount(),
                model.getPriceAmount() / 100.0,
                model.getCurrency().toUpperCase(),
                model.isRecommended()
                        ? "<p style='color: gold; font-weight: bold;'>🌟 Empfohlenes Produkt!</p>"
                        : ""
        );
    }

}
