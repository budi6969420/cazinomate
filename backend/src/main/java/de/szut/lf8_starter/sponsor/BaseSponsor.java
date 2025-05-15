package de.szut.lf8_starter.sponsors;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "sponsors")
@Data
public class SponsorModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String imageUrl;
    private String url;
}
