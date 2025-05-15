package de.szut.lf8_starter.sponsor.sponsors;

import de.szut.lf8_starter.sponsor.BaseSponsor;

public class PrimeSponsor extends BaseSponsor {
    @Override
    public String getId() {
        return "80392758-67e4-44aa-9677-baf20f9ee1b1";
    }

    @Override
    public String getName() {
        return "Prime";
    }

    @Override
    public String getImageUrl() {
        return "https://cdn.budidev.de/84059";
    }

    @Override
    public String getUrl() {
        return "https://drinkprime.com/";
    }
}
