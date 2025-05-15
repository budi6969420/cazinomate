package de.szut.lf8_starter.sponsors;

import lombok.Data;

@Data
public class SponsorMetadata {
    private Long id;

    private String name;
    private String imageUrl;
    private String url;
}
