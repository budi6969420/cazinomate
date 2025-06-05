package de.szut.lf8_starter.payout;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PayoutItemCouponModel {
    private String couponCode;
    private PayoutItemMetaData payoutItemMetaData;
}
