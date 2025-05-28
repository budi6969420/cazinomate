package de.szut.lf8_starter.game;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class HeaderedText {
    private String title;
    private String[] content;
}
