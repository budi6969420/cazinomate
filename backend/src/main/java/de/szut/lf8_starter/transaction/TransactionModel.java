package de.szut.lf8_starter.transaction;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "transactions")
public class TransactionModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String userId;
    private int amount;

    public TransactionModel(String userId, int amount) {
        this.userId = userId;
        this.amount = amount;
    }
}
