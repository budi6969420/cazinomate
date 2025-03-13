package de.szut.lf8_starter.sponsors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/sponsor")
public class SponsorController {

    private final SponsorService sponsorService;

    public SponsorController(SponsorService sponsorService) {
        this.sponsorService = sponsorService;
    }

    @GetMapping
    public ResponseEntity<List<SponsorModel>> getSponsors() {
        return ResponseEntity.ok(this.sponsorService.getAllSponsors());
    }

    @PostMapping
    public ResponseEntity<SponsorModel> addSponsor(@RequestBody AddSponsorDto addSponsorDto) {
        var model = new SponsorModel();
        model.setName(addSponsorDto.getName());
        model.setImageUrl(addSponsorDto.getImageUrl());
        model.setUrl(addSponsorDto.getUrl());
        return ResponseEntity.ok(this.sponsorService.createSponsor(model));
    }

    @PutMapping
    public ResponseEntity<SponsorModel> updateSponsor(@RequestBody SponsorModel sponsorModel) {
        return ResponseEntity.ok(this.sponsorService.updateSponsor(sponsorModel));
    }

    @DeleteMapping("/{id}")
    public void deleteSponsor(@PathVariable Long id) {
        this.sponsorService.deleteSponsor(id);
    }

}
