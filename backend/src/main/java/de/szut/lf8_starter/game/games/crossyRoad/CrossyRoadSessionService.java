package de.szut.lf8_starter.game.games.crossyRoad;

import de.szut.lf8_starter.game.IGame;
import de.szut.lf8_starter.game.session.*;
import de.szut.lf8_starter.game.session.enums.GameDifficulty;
import de.szut.lf8_starter.game.session.enums.GameState;
import de.szut.lf8_starter.transaction.TransactionService;
import org.springframework.stereotype.Service;

@Service
public class CrossyRoadSessionService extends BaseGameSessionService<CrossyRoadSessionExtension> {
    public CrossyRoadSessionService(BaseSessionRepository baseSessionRepository,
                                    CrossyRoadSessionExtensionRepository extensionRepository,
                                    TransactionService transactionService) {
        super(baseSessionRepository, extensionRepository, transactionService);
    }

    @Override
    protected void applyGameLogic(BaseSession baseSession, CrossyRoadSessionExtension extension, String interaction) {

        var prizes = extension.getPrizeIndexValues(baseSession.getInvestedBalance(), baseSession.getDifficulty());
        switch (interaction) {
            case "MOVE" -> {
                extension.setCurrentIndex(extension.getCurrentIndex() + 1);
                if (hasLost(baseSession.getDifficulty())) {
                    baseSession.setGameState(GameState.LOST);
                }
                else if (prizes != null && extension.getCurrentIndex() >= prizes.size() - 1) {
                    baseSession.setGameState(GameState.WON);
                    extension.setBalanceDifference(prizes.get(extension.getCurrentIndex()));
                    addBalanceToUser(baseSession.getUserId(), extension.getBalanceDifference(), getGame().getTitle() + " game won");
                }
                else if (prizes != null) {
                    extension.setBalanceDifference(prizes.get(extension.getCurrentIndex()));
                }
            }
            case "END" -> {
                if (extension.getCurrentIndex() < 0) throw new IllegalStateException("Current index is less than 0");
                baseSession.setGameState(GameState.WON);
                addBalanceToUser(baseSession.getUserId(), extension.getBalanceDifference(), getGame().getTitle() + " game won");

                int simulatedIndex = extension.getCurrentIndex();
                int wouldHaveLostAt = -1;

                while (simulatedIndex++ < prizes.size()) {
                    if (hasLost(baseSession.getDifficulty())) {
                        wouldHaveLostAt = simulatedIndex;
                        break;
                    }
                }
                extension.setWouldHaveLostIndex(wouldHaveLostAt);
            }

            default -> throw new IllegalStateException("Unexpected interaction: " + interaction);
        }
    }

    @Override
    protected CrossyRoadSessionExtension createDefaultExtension(BaseSession baseSession) {
        var extension = new CrossyRoadSessionExtension();
        extension.setSessionId(baseSession.getId());
        extension.setCurrentIndex(-1);
        extension.setBalanceDifference(baseSession.getInvestedBalance());

        return extension;
    }

    @Override
    public IGame getGame() {
        return new CrossyRoadGame();
    }

    private Boolean hasLost(GameDifficulty difficulty) {

        double r = switch (difficulty) {
            case EASY -> 0.05;
            case NORMAL -> 0.1;
            case HARD -> 0.15;
        };
        return Math.random() < r;
    }
}
