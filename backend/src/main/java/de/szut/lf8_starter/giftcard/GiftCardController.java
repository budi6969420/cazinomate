package de.szut.lf8_starter.giftcard;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.szut.lf8_starter.giftcard.dto.CreateGiftCardDto;
import de.szut.lf8_starter.giftcard.dto.GiftCardGeneratePdfDto;
import de.szut.lf8_starter.giftcard.dto.GiftCardInfoDto;
import de.szut.lf8_starter.giftcard.dto.GiftCardIdDto;
import de.szut.lf8_starter.user.JwtService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping(value = "giftcard")
public class GiftCardController {

    private final JwtService jwtService;
    private final GiftCardService giftCardService;
    private final GiftCardPdfService giftCardPdfService;

    public GiftCardController(JwtService jwtService, GiftCardService giftCardService, GiftCardPdfService giftCardPdfService) {
        this.jwtService = jwtService;
        this.giftCardService = giftCardService;
        this.giftCardPdfService = giftCardPdfService;
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

    @PostMapping("/pdf/generate")
    public ResponseEntity<byte[]> generatePdf(@RequestHeader(value = "Authorization", required = false) String authorizationHeader, GiftCardGeneratePdfDto giftCardGeneratePdfDto) throws Exception {
        var userId = jwtService.decodeId(authorizationHeader);
        var cards = new ArrayList<GiftCardEntity>();
        for (int i = 0; i < giftCardGeneratePdfDto.getCount(); i++) {
            cards.add(giftCardService.generateGiftCard(userId, giftCardGeneratePdfDto.getCurrencyAmount()));
        }

        var pdf = giftCardPdfService.generatePdf(cards);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDisposition(ContentDisposition.attachment().filename("giftcards.pdf").build());

        return new ResponseEntity<>(pdf, headers, HttpStatus.OK);
    }
}
