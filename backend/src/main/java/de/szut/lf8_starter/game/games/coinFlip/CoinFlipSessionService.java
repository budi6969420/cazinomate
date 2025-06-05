package de.szut.lf8_starter.game.games.coinFlip;

import de.szut.lf8_starter.game.IGame;
import de.szut.lf8_starter.game.session.BaseGameSessionService;
import de.szut.lf8_starter.game.session.BaseSession;
import de.szut.lf8_starter.game.session.BaseSessionRepository;
import de.szut.lf8_starter.game.session.enums.GameDifficulty;
import de.szut.lf8_starter.game.session.enums.GameState;
import de.szut.lf8_starter.transaction.TransactionService;
import org.springframework.stereotype.Service;

@Service
public class CoinFlipSessionService extends BaseGameSessionService<CoinFlipSessionExtension> {
    public CoinFlipSessionService(BaseSessionRepository baseSessionRepository,
                                  CoinFlipSessionExtensionRepository extensionRepository,
                                  TransactionService transactionService) {
        super(baseSessionRepository, extensionRepository, transactionService);
    }

    @Override
    protected void applyGameLogic(BaseSession baseSession, CoinFlipSessionExtension extension, String interaction) {
        switch (interaction.toLowerCase()) {
            case "play" -> {
                if (hasLost(baseSession.getDifficulty())) {
                    baseSession.setGameState(GameState.LOST);
                }
                else {
                    baseSession.setGameState(GameState.WON);
                    var prize = getPrize(baseSession.getInvestedBalance(), baseSession.getDifficulty());
                    extension.setBalanceDifference(prize);
                    addBalanceToUser(baseSession.getUserId(), prize, getGame().getTitle() + " game won");
                }
            }

            default -> throw new IllegalStateException("Unexpected interaction: " + interaction);
        }
    }

    private int getPrize(int investedBalance, GameDifficulty difficulty) {
        double factor;
        switch (difficulty) {
            case EASY -> factor = 1.5;
            case NORMAL -> factor = 2;
            case HARD -> factor = 3;
            default -> throw new IllegalStateException("Unexpected difficulty: " + difficulty);
        }
        return (int)(investedBalance * factor);
    }

    @Override
    protected CoinFlipSessionExtension createDefaultExtension(BaseSession baseSession) {
        var extension = new CoinFlipSessionExtension();
        extension.setSessionId(baseSession.getId());
        extension.setBalanceDifference(baseSession.getInvestedBalance());

        return extension;
    }

    @Override
    public IGame getGame() {
        return new CoinFlipGame();
    }

    private Boolean hasLost(GameDifficulty difficulty) {

        double r = switch (difficulty) {
            case EASY -> 0.4;
            case NORMAL -> 0.51;
            case HARD -> 0.6;
        };
        return Math.random() < r;
    }
}
