package de.szut.lf8_starter.game.games.crossyRoadGangBang;

import de.szut.lf8_starter.game.IGame;
import de.szut.lf8_starter.game.session.*;
import de.szut.lf8_starter.game.session.enums.GameDifficulty;
import de.szut.lf8_starter.game.session.enums.GameState;
import de.szut.lf8_starter.transaction.TransactionService;
import org.springframework.stereotype.Service;

@Service
public class CrossyRoadGangBangSessionService extends BaseGameSessionService<CrossyRoadGangBangSessionExtension> {
    public CrossyRoadGangBangSessionService(BaseSessionRepository baseSessionRepository,
                                            CrossyRoadGangBangSessionExtensionRepository extensionRepository,
                                            TransactionService transactionService) {
        super(baseSessionRepository, extensionRepository, transactionService);
    }

    @Override
    protected void applyGameLogic(BaseSession baseSession, CrossyRoadGangBangSessionExtension extension, String interaction) {
        switch (interaction.toLowerCase()) {
            case "move" -> {
                extension.setCurrentIndex(extension.getCurrentIndex() + 1);
                var prizes = extension.getPrizeIndexValues(baseSession.getInvestedBalance(), baseSession.getDifficulty());

                if (hasLost(baseSession.getDifficulty())) {
                    baseSession.setGameState(GameState.LOST);
                }
                else if (prizes != null && extension.getCurrentIndex() >= prizes.size() - 1) {
                    baseSession.setGameState(GameState.WON);
                }
                else if (prizes != null) {
                    extension.setBalanceDifference(prizes.get(extension.getCurrentIndex()));
                }
            }
            case "end" -> {
                if (extension.getCurrentIndex() < 0) throw new IllegalStateException("Current index is less than 0");
                baseSession.setGameState(GameState.WON);
                addBalanceToUser(baseSession.getUserId(), extension.getBalanceDifference(), getGame().getTitle() + " game won");
            }

            default -> throw new IllegalStateException("Unexpected interaction: " + interaction);
        }
    }

    @Override
    protected CrossyRoadGangBangSessionExtension createDefaultExtension(BaseSession baseSession) {
        var extension = new CrossyRoadGangBangSessionExtension();
        extension.setSessionId(baseSession.getId());
        extension.setCurrentIndex(-1);
        extension.setBalanceDifference(baseSession.getInvestedBalance());

        return extension;
    }

    @Override
    public IGame getGame() {
        return new CrossyRoadGangBangGame();
    }

    private Boolean hasLost(GameDifficulty difficulty) {

        double r = switch (difficulty) {
            case EASY -> 0.1;
            case NORMAL -> 0.2;
            case HARD -> 0.3;
        };
        return Math.random() < r;
    }
}