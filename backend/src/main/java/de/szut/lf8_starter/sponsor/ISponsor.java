package de.szut.lf8_starter.sponsor;

public interface ISponsor {
    String getId();
    String getName();
    String getImageUrl();
    String getUrl();

    SponsorMetadata getMetadata();
}
