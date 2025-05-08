package de.szut.lf8_starter.payout;

import de.szut.lf8_starter.game.GameMetadata;

import java.io.Serializable;

public abstract class BasePayoutItem implements IPayoutItem {
    @Override
    public PayoutItemMetaData getMetadata() {
        return new PayoutItemMetaData(getId(), getName(), getCost(), getImageUrl());
    }
}
