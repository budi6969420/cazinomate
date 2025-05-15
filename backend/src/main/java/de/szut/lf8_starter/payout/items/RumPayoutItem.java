package de.szut.lf8_starter.payout.items;

import de.szut.lf8_starter.payout.BasePayoutItem;

public class RumPayoutItem extends BasePayoutItem {
    @Override
    public String getId() {
        return "beae6369-1d86-4177-a878-3c80b18c0f46";
    }

    @Override
    public String getName() {
        return "Rum";
    }

    @Override
    public int getCost() {
        return 900;
    }

    @Override
    public String getImageUrl() {
        return "https://cdn.budidev.de/a2dd2";
    }
}
