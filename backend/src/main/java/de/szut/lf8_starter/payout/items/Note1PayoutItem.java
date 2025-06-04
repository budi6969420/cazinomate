package de.szut.lf8_starter.payout.items;

import de.szut.lf8_starter.payout.BasePayoutItem;

public class Note1PayoutItem extends BasePayoutItem {
    @Override
    public String getId() {
        return "1a711347-dbf7-416b-8a1f-877128617499";
    }

    @Override
    public String getName() {
        return "Note 1";
    }

    @Override
    public int getCost() {
        return 9999;
    }

    @Override
    public String getImageUrl() {
        return "https://cdn.budidev.de/b37c5";
    }
}
