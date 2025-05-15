package de.szut.lf8_starter.payout.items;

import de.szut.lf8_starter.payout.BasePayoutItem;

public class JackyColaPayoutItem extends BasePayoutItem {
    @Override
    public String getId() {
        return "657ab94d-d36d-458c-ac1a-05056b4fafa6";
    }

    @Override
    public String getName() {
        return "Jacky Cola";
    }

    @Override
    public int getCost() {
        return 700;
    }

    @Override
    public String getImageUrl() {
        return "";
    }
}
