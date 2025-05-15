package de.szut.lf8_starter.sponsor;

import de.szut.lf8_starter.sponsor.sponsors.GoenergySponsor;
import de.szut.lf8_starter.sponsor.sponsors.OnlyFansSponsor;
import de.szut.lf8_starter.sponsor.sponsors.PrimeSponsor;
import de.szut.lf8_starter.sponsor.sponsors.ProdBrnsSponsor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SponsorService {
    private List<ISponsor> sponsors = List.of(
            new GoenergySponsor(),
            new PrimeSponsor(),
            new OnlyFansSponsor(),
            new ProdBrnsSponsor());

    public List<SponsorMetadata> getAllSponsorMetadata() {
        return sponsors.stream().map(ISponsor::getMetadata).toList();
    }
}
