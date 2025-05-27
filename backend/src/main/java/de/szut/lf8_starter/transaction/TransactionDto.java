package de.szut.lf8_starter.transaction;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
public class TransactionDto {
    private Long id;
    private int amount;
    private String category;
    private String description;
    private Date date;

    public TransactionDto(TransactionModel transactionModel) {
        this.id = transactionModel.getId();
        this.amount = transactionModel.getAmount();
        this.category = transactionModel.getCategory().toString();
        this.description = transactionModel.getDescription();
        this.date = transactionModel.getDate();
    }
}
