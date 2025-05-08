package de.szut.lf8_starter.transaction;

import org.springframework.stereotype.Service;

@Service
public class TransactionService {
    private final ITransactionRepository transactionRepository;

    public TransactionService(ITransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public Boolean TryAddTransaction(String userId, int amount) {
        if (GetUserBalance(userId) - amount < 0) {
            return false;
        }
        transactionRepository.save(new TransactionModel(userId, amount));
        return true;
    }

    public int GetUserBalance(String userId) {
        return transactionRepository.findByUserId(userId).stream().mapToInt(TransactionModel::getAmount).sum();
    }
}
