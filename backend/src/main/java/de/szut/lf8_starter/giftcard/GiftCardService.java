package de.szut.lf8_starter.giftcard;

import de.szut.lf8_starter.game.coupons.ICouponCodeGenerator;
import de.szut.lf8_starter.user.UserService;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class GiftCardService {

    private final GiftCardRepository giftCardRepository;
    private final ICouponCodeGenerator couponCodeGenerator;
    private final UserService userService;

    public GiftCardService(GiftCardRepository giftCardRepository, ICouponCodeGenerator couponCodeGenerator, UserService userService) {
        this.giftCardRepository = giftCardRepository;
        this.couponCodeGenerator = couponCodeGenerator;
        this.userService = userService;
    }

    public GiftCardModel generateGiftCard(String creatorId, int amount) {
        var model = new GiftCardModel();
        model.setId(couponCodeGenerator.generate().toUpperCase());
        model.setAmount(amount);
        model.setCreatedOn(Date.from(Instant.now()));
        model.setCreatedByUserId(creatorId);

        this.giftCardRepository.save(model);
        return model;
    }

    public Optional<GiftCardModel> getGiftCard(String id) {
        return this.giftCardRepository.findById(id.toUpperCase());
    }

    public List<GiftCardModel> getAllNonUsedGiftCards() {
        return this.giftCardRepository.findAll().stream().filter(x -> x.getUsedByUserId() == null).collect(Collectors.toList());
    }

    public boolean TryUseGiftCard(String id, String userid) {
        var user = this.userService.getUserData(userid);
        var giftCard = getGiftCard(id.toUpperCase());

        if (user == null || giftCard.isEmpty()) {
            return false;
        }

        if (giftCard.get().getUsedByUserId() != null) return false;

        giftCard.get().setUsedByUserId(userid);
        giftCard.get().setUsedOn(Date.from(Instant.now()));

        this.giftCardRepository.save(giftCard.get());
        return true;
    }
}
