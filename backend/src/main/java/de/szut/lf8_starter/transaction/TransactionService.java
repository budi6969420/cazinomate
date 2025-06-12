package de.szut.lf8_starter.transaction;

import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class TransactionService {
    private final ITransactionRepository transactionRepository;

    public TransactionService(ITransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public Boolean tryAddTransaction(String userId, int amount, TransactionCategory category, String description) {
        if (getUserBalance(userId) +  amount < 0) {
            return false;
        }
        transactionRepository.save(new TransactionModel(userId, amount, category, description, new Date()));
        return true;
    }

    public int getUserBalance(String userId) {
        return transactionRepository.findByUserIdOrderByDateDesc(userId).stream().mapToInt(TransactionModel::getAmount).sum();
    }

    public List<TransactionModel> getUserTransactions(String userId) {
        return transactionRepository.findByUserIdOrderByDateDesc(userId);
    }
}
