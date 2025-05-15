package de.szut.lf8_starter.sponsor;

public abstract class BaseSponsor implements ISponsor{
    @Override
    public SponsorMetadata getMetadata() {
        return new SponsorMetadata(getId(), getName(), getImageUrl(), getUrl());
    }
}
