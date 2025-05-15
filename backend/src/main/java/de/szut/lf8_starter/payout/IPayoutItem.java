package de.szut.lf8_starter.payout;

public interface IPayoutItem {
    String getId();
    String getName();
    int getCost();
    String getImageUrl();
    PayoutItemMetaData getMetadata();
}
