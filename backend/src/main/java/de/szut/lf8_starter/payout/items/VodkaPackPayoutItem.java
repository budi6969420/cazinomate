package de.szut.lf8_starter.payout.items;

import de.szut.lf8_starter.payout.BasePayoutItem;

public class BeerPayoutItem extends BasePayoutItem {

    @Override
    public String getId() {
        return "9383876f-e37d-48c6-ad15-38964e7e0b33";
    }

    @Override
    public String getName() {
        return "Bier";
    }

    @Override
    public int getCost() {
        return 500;
    }

    @Override
    public String getImageUrl() {
        return "";
    }
}
