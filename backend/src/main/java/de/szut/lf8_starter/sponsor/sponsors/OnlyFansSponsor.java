package de.szut.lf8_starter.sponsor.sponsors;

import de.szut.lf8_starter.sponsor.BaseSponsor;

public class OnlyFansSponsor extends BaseSponsor {
    @Override
    public String getId() {
        return "1edc44b9-99c9-4356-9df4-46a1444abb66";
    }

    @Override
    public String getName() {
        return "OnlyFans";
    }

    @Override
    public String getImageUrl() {
        return "https://cdn.budidev.de/47e64";
    }

    @Override
    public String getUrl() {
        return "https://onlyfans.com/";
    }
}
