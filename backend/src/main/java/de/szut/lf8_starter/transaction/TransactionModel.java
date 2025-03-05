package de.szut.lf8_starter.transaction;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "transactions")
public class TransactionModel {
    @Id
    private Long id;
    private String userId;
    private int amount;

    public TransactionModel(String userId, int amount) {
        this.userId = userId;
        this.amount = amount;
    }

    public TransactionModel() {

    }
}
