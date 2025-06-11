package de.szut.lf8_starter.giftcard;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.graphics.image.LosslessFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class GiftCardPdfService {
    public byte[] generatePdf(List<GiftCardEntity> giftCards) throws IOException {
        var templateImage = ImageIO.read(new ClassPathResource("assets/GiftCardTemplate.png").getInputStream());
        var document = new PDDocument();
        var font = PDType1Font.HELVETICA_BOLD;

        var pageSize = PDRectangle.A4;
        float pageWidth = pageSize.getWidth();
        float pageHeight = pageSize.getHeight();

        float margin = 0;
        int rows = 5;
        int cols = 2;
        float spacing = 0;

        float cardWidth = (pageWidth - 2 * margin - (cols - 1) * spacing) / cols;
        float cardHeight = (pageHeight - 2 * margin - (rows - 1) * spacing) / rows;

        var pages = partitionList(giftCards, 10);

        for (var pageCards : pages) {
            var page = new PDPage(pageSize);
            document.addPage(page);
            var stream = new PDPageContentStream(document, page);

            for (int i = 0; i < pageCards.size(); i++) {
                var gc = pageCards.get(i);
                int row = i % rows;
                int col = i / rows;

                float x = margin + col * (cardWidth + spacing);
                float y = pageHeight - margin - (row + 1) * cardHeight - row * spacing;

                var pdImage = LosslessFactory.createFromImage(document, templateImage);
                stream.drawImage(pdImage, x, y, cardWidth, cardHeight);

                stream.beginText();
                stream.setFont(font, 20);
                stream.newLineAtOffset(x + 30, y + 22);
                stream.showText(gc.getId());
                stream.newLineAtOffset(152, 39);
                stream.showText(String.valueOf(gc.getAmount()));
                stream.endText();
            }

            stream.close();
        }

        var output = new ByteArrayOutputStream();
        document.save(output);
        document.close();

        return output.toByteArray();
    }

    private List<List<GiftCardEntity>> partitionList(List<GiftCardEntity> list, int size) {
        var partitions = new ArrayList<List<GiftCardEntity>>();
        for (int i = 0; i < list.size(); i += size) {
            partitions.add(list.subList(i, Math.min(i + size, list.size())));
        }
        return partitions;
    }
}
