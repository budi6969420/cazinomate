package de.szut.lf8_starter.game.games.slots;

import de.szut.lf8_starter.game.IGame;
import de.szut.lf8_starter.game.session.BaseGameSessionService;
import de.szut.lf8_starter.game.session.BaseSession;
import de.szut.lf8_starter.game.session.BaseSessionRepository;
import de.szut.lf8_starter.game.session.enums.GameDifficulty;
import de.szut.lf8_starter.transaction.TransactionService;
import org.springframework.stereotype.Service;

@Service
public class SlotsSessionService extends BaseGameSessionService<SlotsSessionExtension> {
    protected SlotsSessionService(BaseSessionRepository baseSessionRepository, SlotsSessionExtensionRepository extensionRepository, TransactionService transactionService) {
        super(baseSessionRepository, extensionRepository, transactionService);
    }

    @Override
    protected void applyGameLogic(BaseSession baseSession, SlotsSessionExtension extension, String interaction) {

    }

    @Override
    protected SlotsSessionExtension createDefaultExtension(BaseSession baseSession) {
        return new SlotsSessionExtension();
    }

    @Override
    public IGame getGame() {
        return new SlotsGame();
    }

    @Override
    public int getPrize(int balanceInvested, GameDifficulty gameDifficulty, SlotsSessionExtension session) {
        return 0;
    }
}
