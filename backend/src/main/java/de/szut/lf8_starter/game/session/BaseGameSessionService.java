package de.szut.lf8_starter.game.session;

import de.szut.lf8_starter.game.BaseGame;
import de.szut.lf8_starter.game.session.enums.GameDifficulty;
import de.szut.lf8_starter.game.session.enums.GameState;
import de.szut.lf8_starter.statistics.GameStatisticsModel;
import de.szut.lf8_starter.transaction.TransactionCategory;
import de.szut.lf8_starter.transaction.TransactionService;
import org.apache.coyote.BadRequestException;

import java.util.*;

public abstract class BaseGameSessionService<T extends BaseSessionExtension> implements IGameSessionService<T> {

    protected final BaseSessionRepository baseSessionRepository;
    protected final BaseGameSessionExtensionRepository<T, String> extensionRepository;
    private final TransactionService transactionService;

    protected BaseGameSessionService(BaseSessionRepository baseSessionRepository,
                                     BaseGameSessionExtensionRepository<T, String> extensionRepository,
                                     TransactionService transactionService) {
        this.baseSessionRepository = baseSessionRepository;
        this.extensionRepository = extensionRepository;
        this.transactionService = transactionService;
    }

    @Override
    public Optional<GameSessionAggregate<T>> findActiveSession(String userId, String gameId) {
        var activeGames = baseSessionRepository.findAllByUserIdAndGameIdAndGameState(userId, gameId, GameState.ACTIVE);
        if (activeGames.isEmpty()) {
            return Optional.empty();
        }
        var baseSession = activeGames.getFirst();

        var extension = extensionRepository.findBySessionId(baseSession.getId())
                .orElseGet(() -> createDefaultExtension(baseSession));

        return Optional.of(new GameSessionAggregate<>(baseSession, extension));
    }

    @Override
    public GameSessionAggregate<T> startSession(String userId, String gameId, Integer difficultyInt, int investedBalance) throws BadRequestException {
        var activeSessionOpt = findActiveSession(userId, gameId);
        if (activeSessionOpt.isPresent()) {
            return activeSessionOpt.get();
        }

        if (investedBalance <= 0) {
            throw new IllegalArgumentException("Invested balance must be greater than 0");
        }

        if (transactionService.GetUserBalance(userId) < investedBalance) {
            throw new BadRequestException("user does not have enough balance");
        }

        var baseSession = new BaseSession();
        baseSession.setGameId(gameId);
        baseSession.setId(UUID.randomUUID().toString());
        baseSession.setUserId(userId);
        baseSession.setInvestedBalance(investedBalance);
        baseSession.setGameState(GameState.ACTIVE);

        GameDifficulty difficulty = GameDifficulty.NORMAL;
        try {
            if (difficultyInt != null) {
                difficulty = GameDifficulty.values()[difficultyInt];
            }
        } catch (Exception ignored) {}

        baseSession.setDifficulty(difficulty);
        baseSession = baseSessionRepository.save(baseSession);

        var extension = createDefaultExtension(baseSession);
        extension = extensionRepository.save(extension);

        addBalanceToUser(userId, -investedBalance, getGame().getTitle() + " game started");

        return new GameSessionAggregate<>(baseSession, extension);
    }

    @Override
    public GameSessionAggregate<T> processAction(String sessionId, String userId, String interaction) {
        BaseSession baseSession = baseSessionRepository.findById(sessionId)
                .orElseThrow(() -> new IllegalArgumentException("Session not found"));

        T extension = extensionRepository.findBySessionId(sessionId)
                .orElseThrow(() -> new IllegalArgumentException("Extension not found"));

        if (!baseSession.getUserId().equals(userId)) {
            throw new SecurityException("User does not match session owner");
        }

        if (!baseSession.getGameState().equals(GameState.ACTIVE)) {
            return new GameSessionAggregate<>(baseSession, extension);
        }

        applyGameLogic(baseSession, extension, interaction);

        if (baseSession.getGameState().equals(GameState.WON)) {
            var prize = getPrize(baseSession.getInvestedBalance(), baseSession.getDifficulty(), extension);
            baseSession.setBalanceDifference(prize);
            addBalanceToUser(baseSession.getUserId(), prize, getGame().getTitle() + " game won");
        }

        baseSessionRepository.save(baseSession);
        extensionRepository.save(extension);

        return new GameSessionAggregate<>(baseSession, extension);
    }

    @Override
    public GameStatisticsModel generateStatistics(String userId) {
        var gameId = this.getGame().getId();
        List<BaseSession> sessions;

        if (userId != null) {
            sessions = baseSessionRepository.findAllByUserIdAndGameId(userId, gameId)
                    .stream()
                    .filter(x -> !x.getGameState().equals(GameState.ACTIVE))
                    .toList();
        } else {
            sessions = baseSessionRepository.findAllByGameId(gameId)
                    .stream()
                    .filter(x -> !x.getGameState().equals(GameState.ACTIVE))
                    .toList();
        }

        var totalGamesPlayed = sessions.size();
        var totalGamesWon = sessions.stream().filter(x -> x.getGameState().equals(GameState.WON)).count();
        var totalAmountInvested = sessions.stream().mapToInt(BaseSession::getInvestedBalance).sum();
        var totalAmountWon = sessions.stream().mapToInt(BaseSession::getBalanceDifference).sum();

        return new GameStatisticsModel(gameId, totalGamesPlayed, (int) totalGamesWon, totalAmountInvested, totalAmountWon);
    }

    protected void addBalanceToUser(String userId, int amount, String description) {
        this.transactionService.TryAddTransaction(userId, amount, TransactionCategory.Game, description);
    }

    protected abstract void applyGameLogic(BaseSession baseSession, T extension, String interaction);

    protected abstract T createDefaultExtension(BaseSession baseSession);
}
