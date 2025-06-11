package de.szut.lf8_starter.giftcard;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

import java.util.Date;

@Entity
@Data
public class GiftCardModel {
    @Id
    private String id;
    private int amount;
    private Date createdOn;
    private String createdByUserId;
    private String usedByUserId;
    private Date usedOn;
}
