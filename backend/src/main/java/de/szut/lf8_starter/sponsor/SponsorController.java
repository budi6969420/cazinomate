package de.szut.lf8_starter.sponsor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "sponsor")
public class SponsorController {

    private final SponsorService sponsorService;

    public SponsorController(SponsorService sponsorService) {
        this.sponsorService = sponsorService;
    }

    @GetMapping
    public ResponseEntity<List<SponsorMetadata>> getSponsors() {
        return ResponseEntity.ok(this.sponsorService.getAllSponsorMetadata());
    }
}
