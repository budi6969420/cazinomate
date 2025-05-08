package de.szut.lf8_starter.payout;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PayoutSuccessfulResponseDto {
    private String code;
    private String payoutItemId;
}
