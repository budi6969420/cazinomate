package de.szut.lf8_starter.payout.items;

import de.szut.lf8_starter.payout.BasePayoutItem;

public class JackyColaPackPayoutItem extends BasePayoutItem {
    @Override
    public String getId() {
        return "95b82fd0-9cc0-4b7e-ad17-d30c05e46c1a";
    }

    @Override
    public String getName() {
        return "6er Jacky Cola";
    }

    @Override
    public int getCost() {
        return 1750;
    }

    @Override
    public String getImageUrl() {
        return "https://cdn.budidev.de/11b27";
    }
}
