package de.szut.lf8_starter.transaction;

import org.springframework.stereotype.Service;

@Service
public class TransactionService {
    private final ITransactionRepository transactionRepository;

    public TransactionService(ITransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public void AddTransaction(String userId, int amount) {
        transactionRepository.save(new TransactionModel(userId, amount));
    }

    public int GetUserBalance(String userId) {
        return transactionRepository.findByUserId(userId).stream().mapToInt(TransactionModel::getAmount).sum();
    }
}
