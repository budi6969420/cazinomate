package de.szut.lf8_starter.game;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HeaderedText {
    private String title;
    private String[] content;
}
