package de.szut.lf8_starter.payout.items;

import de.szut.lf8_starter.payout.BasePayoutItem;

public class RumPackPayoutItem extends BasePayoutItem {
    @Override
    public String getId() {
        return "fed36825-72f5-4334-beb6-1a5fa1728a80";
    }

    @Override
    public String getName() {
        return "6er Rum";
    }

    @Override
    public int getCost() {
        return 6850;
    }

    @Override
    public String getImageUrl() {
        return "https://cdn.budidev.de/924e6";
    }
}
