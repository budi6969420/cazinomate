package de.szut.lf8_starter.transaction;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

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
    @Enumerated(EnumType.STRING)
    private TransactionCategory category;
    private String description;
    private Date date;

    public TransactionModel(String userId, int amount, TransactionCategory category, String description, Date date) {
        this.userId = userId;
        this.amount = amount;
        this.category = category;
        this.description = description;
        this.date = date;
    }
}
