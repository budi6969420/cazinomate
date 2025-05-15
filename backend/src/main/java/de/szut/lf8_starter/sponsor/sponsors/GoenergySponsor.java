package de.szut.lf8_starter.sponsor.sponsors;

import de.szut.lf8_starter.sponsor.BaseSponsor;

public class GoenergySponsor extends BaseSponsor {
    @Override
    public String getId() {
        return "3a3db988-166c-4a3d-b4e1-46866eb0b9a4";
    }

    @Override
    public String getName() {
        return "Goenergy";
    }

    @Override
    public String getImageUrl() {
        return "https://cdn.budidev.de/c54ee";
    }

    @Override
    public String getUrl() {
        return "https://goenrgy.de/";
    }
}
