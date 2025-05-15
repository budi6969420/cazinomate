package de.szut.lf8_starter.sponsors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SponsorService {
    private final ISponsorRepository sponsorRepository;

    public SponsorService(ISponsorRepository sponsorRepository) {
        this.sponsorRepository = sponsorRepository;
    }

    public SponsorModel getSponsorById(Long id) {
        var optional = sponsorRepository.findById(id);
        return optional.orElse(null);
    }

    public List<SponsorModel> getAllSponsors() {
        return sponsorRepository.findAll();
    }

    public SponsorModel createSponsor(SponsorModel sponsor) {
        return sponsorRepository.save(sponsor);
    }

    public SponsorModel updateSponsor(SponsorModel sponsor) {
        return sponsorRepository.save(sponsor);
    }

    public void deleteSponsor(Long id) {
        sponsorRepository.deleteById(id);
    }

}
