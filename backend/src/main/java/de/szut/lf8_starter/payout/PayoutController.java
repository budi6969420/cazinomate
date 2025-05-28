package de.szut.lf8_starter.payout;

import de.szut.lf8_starter.game.coupons.ICouponCodeGenerator;
import de.szut.lf8_starter.user.UserService;
import de.szut.lf8_starter.transaction.TransactionCategory;
import de.szut.lf8_starter.transaction.TransactionService;
import de.szut.lf8_starter.user.JwtService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping(value = "payout")
@RestController
public class PayoutController {
    private final PayoutItemService payoutItemService;
    private final JwtService jwtService;
    private final TransactionService transactionService;
    private final UserService userService;
    private final ICouponCodeGenerator couponCodeGenerator;

    public PayoutController(PayoutItemService payoutItemService, JwtService jwtService, TransactionService transactionService, UserService userService, @Qualifier("mock") ICouponCodeGenerator couponCodeGenerator) {
        this.payoutItemService = payoutItemService;
        this.jwtService = jwtService;
        this.transactionService = transactionService;
        this.userService = userService;
        this.couponCodeGenerator = couponCodeGenerator;
    }

    @GetMapping()
    public ResponseEntity<List<PayoutItemMetaData>> getAllPayoutItemsMetadata() {
        var payoutItemsMetadata = this.payoutItemService.getPayoutItemMetadata();
        return ResponseEntity.ok(payoutItemsMetadata);
    }

    @PostMapping()
    public ResponseEntity<PayoutSuccessfulResponseDto> purchasePayoutItem(@RequestHeader(value = "Authorization", required = false) String authorizationHeader,@RequestBody PurchasePayoutItemDto purchasePayoutItemDto) throws Exception {
        var user = userService.getUserData(jwtService.decodeId(authorizationHeader));
        var item = payoutItemService.getPayoutItemMetadataById(purchasePayoutItemDto.getId());

        if (item == null) return ResponseEntity.notFound().build();

        var code = couponCodeGenerator.generate();

        if (!transactionService.TryAddTransaction(user.getId(), -item.getCost(), TransactionCategory.Payment, "1x ".concat(item.getName()).concat(": ").concat(code))) {
            return ResponseEntity.badRequest().build();
        }

        var response = new PayoutSuccessfulResponseDto(code);

        return ResponseEntity.ok(response);
    }
}
