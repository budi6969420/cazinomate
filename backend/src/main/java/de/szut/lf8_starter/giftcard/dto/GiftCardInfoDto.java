package de.szut.lf8_starter.giftcard.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GiftCardInfoDto {
    private String id;
    private int amount;
}
