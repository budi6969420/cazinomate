package de.szut.lf8_starter.transaction;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ITransactionRepository extends JpaRepository<TransactionModel, Long> {

    List<TransactionModel> findByUserIdOrderByDateDesc(String userId);
}
