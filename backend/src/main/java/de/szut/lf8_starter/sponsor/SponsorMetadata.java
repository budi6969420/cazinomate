package de.szut.lf8_starter.sponsor;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SponsorMetadata {
    private String id;

    private String name;
    private String imageUrl;
    private String url;
}
