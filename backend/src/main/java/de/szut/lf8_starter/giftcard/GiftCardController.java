package de.szut.lf8_starter.giftcard;

import de.szut.lf8_starter.user.JwtService;
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
    public ResponseEntity<?> useGiftCard(
            @RequestHeader(value = "Authorization", required = false) String authorizationHeader,
            @RequestBody GiftCardDto dto) throws Exception {
        if (giftCardService.TryUseGiftCard(dto.getId(), jwtService.decodeId(authorizationHeader))) {
            return (ResponseEntity<?>) ResponseEntity.ok();
        }
        else {
            return (ResponseEntity<?>) ResponseEntity.badRequest();
        }

    }

    @PostMapping("/generate")
    public ResponseEntity<GiftCardDto> createGiftCard(
            @RequestHeader(value = "Authorization", required = false) String authorizationHeader) throws Exception {
        var id = jwtService.decodeId(authorizationHeader);
        var model = giftCardService.generateGiftCard(id);
        return ResponseEntity.ok(new GiftCardDto(model.getId()));
    }

    @GetMapping()
    public ResponseEntity<List<GiftCardDto>> getAllActiveGiftCard(){
        return ResponseEntity.ok(giftCardService.getAllNonUsedGiftCards().stream().map(x -> new GiftCardDto(x.getId())).toList());
    }
}
