package de.szut.lf8_starter.giftcard;

import de.szut.lf8_starter.game.coupons.ICouponCodeGenerator;
import de.szut.lf8_starter.transaction.TransactionCategory;
import de.szut.lf8_starter.transaction.TransactionService;
import de.szut.lf8_starter.user.UserService;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class GiftCardService {

    private final GiftCardRepository giftCardRepository;
    private final ICouponCodeGenerator couponCodeGenerator;
    private final UserService userService;
    private final TransactionService transactionService;

    public GiftCardService(GiftCardRepository giftCardRepository, ICouponCodeGenerator couponCodeGenerator, UserService userService, TransactionService transactionService) {
        this.giftCardRepository = giftCardRepository;
        this.couponCodeGenerator = couponCodeGenerator;
        this.userService = userService;
        this.transactionService = transactionService;
    }

    public GiftCardEntity generateGiftCard(String creatorId, int amount) {
        var model = new GiftCardEntity();
        model.setId(couponCodeGenerator.generate().toUpperCase());
        model.setAmount(amount);
        model.setCreatedOn(Date.from(Instant.now()));
        model.setCreatedByUserId(creatorId);

        this.giftCardRepository.save(model);
        return model;
    }

    public Optional<GiftCardEntity> getGiftCard(String id) {
        return this.giftCardRepository.findById(id.toUpperCase());
    }

    public List<GiftCardEntity> getAllNonUsedGiftCards() {
        return this.giftCardRepository.findAll().stream().filter(x -> x.getUsedByUserId() == null).collect(Collectors.toList());
    }

    public boolean TryUseGiftCard(String id, String userid) {
        var user = this.userService.getUserData(userid);
        var giftCard = getGiftCard(id.toUpperCase());

        if (user == null || giftCard.isEmpty()) {
            return false;
        }

        if (giftCard.get().getUsedByUserId() != null) return false;
        if (!transactionService.tryAddTransaction(userid, giftCard.get().getAmount(), TransactionCategory.GiftCard, "GiftCard with code " + giftCard.get().getId() + " was redeemed")) {
            return false;
        }

        giftCard.get().setUsedByUserId(userid);
        giftCard.get().setUsedOn(Date.from(Instant.now()));

        this.giftCardRepository.save(giftCard.get());
        return true;
    }
}
