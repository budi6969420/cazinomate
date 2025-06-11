package de.szut.lf8_starter.giftcard;

import de.szut.lf8_starter.giftcard.dto.CreateGiftCardDto;
import de.szut.lf8_starter.giftcard.dto.GiftCardInfoDto;
import de.szut.lf8_starter.giftcard.dto.GiftCardIdDto;
import de.szut.lf8_starter.user.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "giftcard")
public class GiftCardController {

    private final JwtService jwtService;
    private final GiftCardService giftCardService;

    public GiftCardController(JwtService jwtService, GiftCardService giftCardService) {
        this.jwtService = jwtService;
        this.giftCardService = giftCardService;
    }

    @PostMapping("/use")
    public ResponseEntity<GiftCardInfoDto> useGiftCard(
            @RequestHeader(value = "Authorization", required = false) String authorizationHeader,
            @RequestBody GiftCardIdDto dto) throws Exception {
        var giftCard = giftCardService.getGiftCard(dto.getId());
        if (giftCard.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        if (giftCardService.TryUseGiftCard(dto.getId(), jwtService.decodeId(authorizationHeader))) {
            return ResponseEntity.ok(new GiftCardInfoDto(giftCard.get().getId(), giftCard.get().getAmount()));
        }
        else {
            return ResponseEntity.badRequest().build();
        }

    }

    @PostMapping("/generate")
    public ResponseEntity<GiftCardIdDto> createGiftCard(
            @RequestHeader(value = "Authorization", required = false) String authorizationHeader, @RequestBody CreateGiftCardDto dto) throws Exception {
        var userId = jwtService.decodeId(authorizationHeader);
        var model = giftCardService.generateGiftCard(userId, dto.getAmount());
        return ResponseEntity.ok(new GiftCardIdDto(model.getId()));
    }

    @GetMapping()
    public ResponseEntity<List<GiftCardInfoDto>> getAllActiveGiftCard(){
        return ResponseEntity.ok(giftCardService.getAllNonUsedGiftCards().stream().map(x -> new GiftCardInfoDto(x.getId(), x.getAmount())).toList());
    }
}
