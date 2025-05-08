package de.szut.lf8_starter.payout;

import de.szut.lf8_starter.services.KeycloakService;
import de.szut.lf8_starter.transaction.TransactionService;
import de.szut.lf8_starter.user.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping(value = "api/payout")
@RestController
public class PayoutController {
    private final PayoutItemService payoutItemService;
    private final JwtService jwtService;
    private final TransactionService transactionService;
    private final KeycloakService keycloakService;

    public PayoutController(PayoutItemService payoutItemService, JwtService jwtService, TransactionService transactionService, KeycloakService keycloakService) {
        this.payoutItemService = payoutItemService;
        this.jwtService = jwtService;
        this.transactionService = transactionService;
        this.keycloakService = keycloakService;
    }

    @GetMapping()
    public ResponseEntity<List<PayoutItemMetaData>> getAllPayoutItemsMetadata() {
        var payoutItemsMetadata = this.payoutItemService.getPayoutItemMetadata();
        return ResponseEntity.ok(payoutItemsMetadata);
    }

    @PostMapping()
    public ResponseEntity<?> purchasePayoutItem(@RequestHeader(value = "Authorization", required = false) String authorizationHeader,@RequestBody PurchasePayoutItemDto purchasePayoutItemDto) throws Exception {
        var user = keycloakService.getUserData(jwtService.decodeId(authorizationHeader));
        var item = payoutItemService.getPayoutItemMetadataById(purchasePayoutItemDto.getId());

        if (item == null) return ResponseEntity.notFound().build();

        if (!transactionService.TryAddTransaction(user.getId(), item.getCost())) {
            return ResponseEntity.badRequest().build();
        }

        // send email

        return ResponseEntity.ok().build();
    }
}
