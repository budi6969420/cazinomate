package de.szut.lf8_starter.payout.coupons;

import org.springframework.stereotype.Service;

import java.util.Random;

@Service("mock")
public class MockCouponCodeGenerator implements ICouponCodeGenerator {

    @Override
    public String generate() {
        StringBuilder giftCardCode = new StringBuilder();
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        Random random = new Random();

        int totalLength = 16;
        int groupSize = 4;
        int numGroups = totalLength / groupSize;

        for (int i = 0; i < numGroups; i++) {
            for (int j = 0; j < groupSize; j++) {
                int index = random.nextInt(characters.length());
                giftCardCode.append(characters.charAt(index));
            }
            if (i < numGroups - 1) {
                giftCardCode.append("-");
            }
        }

        return giftCardCode.toString();
    }
}
