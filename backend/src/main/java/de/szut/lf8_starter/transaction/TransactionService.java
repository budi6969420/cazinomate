package de.szut.lf8_starter.transaction;

import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;

@Service
public class TransactionService {
    private final ITransactionRepository transactionRepository;

    public TransactionService(ITransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public Boolean TryAddTransaction(String userId, int amount, TransactionCategory category, String description) {
        if (GetUserBalance(userId) - amount < 0) {
            return false;
        }
        transactionRepository.save(new TransactionModel(userId, amount, category, description, new Date()));
        return true;
    }

    public int GetUserBalance(String userId) {
        return transactionRepository.findByUserId(userId).stream().mapToInt(TransactionModel::getAmount).sum();
    }
}
