package de.szut.lf8_starter.payout;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PayoutItemMetaData {
    private String id;
    private String name;
    private int cost;
    private String imageUrl;
}
