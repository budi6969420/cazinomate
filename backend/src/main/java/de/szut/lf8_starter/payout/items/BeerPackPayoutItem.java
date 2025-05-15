package de.szut.lf8_starter.payout.items;

import de.szut.lf8_starter.payout.BasePayoutItem;

public class BeerPackPayoutItem extends BasePayoutItem {
    @Override
    public String getId() {
        return "ea8b2ebd-7f9c-425d-872a-abbb8277e790";
    }

    @Override
    public String getName() {
        return "Bierpackung";
    }

    @Override
    public int getCost() {
        return 2500;
    }

    @Override
    public String getImageUrl() {
        return "https://cdn.budidev.de/efb25";
    }
}
