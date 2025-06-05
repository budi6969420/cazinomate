package de.szut.lf8_starter.payout;

import de.szut.lf8_starter.payout.items.*;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class PayoutItemService {
    private final List<IPayoutItem> payoutItems = List.of(
            new VodkaPayoutItem(),
            new VodkaPackPayoutItem(),
            new RumPayoutItem(),
            new RumPackPayoutItem(),
            new JackyColaPackPayoutItem(),
            new BeerPackPayoutItem(),
            new Note1PayoutItem()
    );

    public List<IPayoutItem> getPayoutItems() {
        return this.payoutItems;
    }

    public IPayoutItem getPayoutItemById(String id) {
        var optionalPayoutItem = payoutItems.stream().filter(x -> x.getId().equals(id)).findFirst();
        if (optionalPayoutItem.isEmpty()) return null;

        return optionalPayoutItem.get();
    }

    public PayoutItemMetaData getPayoutItemMetadataById(String id) {
        var optionalPayoutItem = payoutItems.stream().filter(x -> x.getId().equals(id)).findFirst();
        if (optionalPayoutItem.isEmpty()) return null;

        return optionalPayoutItem.get().getMetadata();
    }

    public List<PayoutItemMetaData> getPayoutItemMetadata() {
        return this.payoutItems.stream().map(IPayoutItem::getMetadata).toList();
    }
}
