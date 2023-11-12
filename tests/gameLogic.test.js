const { startGame, processNumber, askNumber, _testExports } = require('../src/gameLogic');
const { aiTurn, setAIDifficulty } = require('../src/ai');

jest.mock('readline', () => ({
    createInterface: jest.fn().mockReturnValue({
        question: jest.fn(), // No automatic callback call
        close: jest.fn(),
    }),
}));

jest.mock('../src/ai', () => {
    return {
        aiTurn: jest.fn(),
        setAIDifficulty: jest.fn(),
    };
});

describe('Game Logic Tests', () => {
    let logSpy;

    beforeEach(() => {
        // Reset mocked functions and game state before each test
        jest.clearAllMocks();
        _testExports.resetGameState();
        logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
        logSpy.mockRestore();
    });

    test('processNumber updates totalScore and switches player', () => {
        processNumber('5');
        expect(_testExports.getTotalScore()).toBe(5);
        expect(_testExports.getCurrentPlayer()).toBe(2);
    });

    test('processNumber handles invalid input', () => {
        processNumber('invalid');
        expect(logSpy).toHaveBeenCalledWith('Invalid input. Please enter a number between 1 and 10.');
        expect(_testExports.getTotalScore()).toBe(0); // Score should not change
    });

    test('askNumber prompts AI turn when currentPlayer is AI', () => {
        _testExports.setCurrentPlayer(2); // Set AI's turn
        askNumber();
        expect(aiTurn).toHaveBeenCalled();
    });

    test('startGame initializes two-player mode correctly', () => {
        startGame();
        expect(_testExports.getCurrentPlayer()).toBe(1); // Default player to start
    });

    test('Game ends when total score reaches 100', () => {
        _testExports.setTotalScore(95);
        processNumber('5');
        expect(_testExports.getTotalScore()).toBe(100);
        expect(logSpy).toHaveBeenCalledWith(`Player ${_testExports.getCurrentPlayer()} wins!`);
    });

    test('Game correctly switches players after each valid turn', () => {
        processNumber('3');
        expect(_testExports.getCurrentPlayer()).toBe(2); // Switch to player 2 (or AI)
        processNumber('4');
        expect(_testExports.getCurrentPlayer()).toBe(1); // Switch back to player 1
    });

    test('Game does not switch players after invalid turn', () => {
        _testExports.setCurrentPlayer(1);
        processNumber('invalid');
        expect(_testExports.getCurrentPlayer()).toBe(1); // Remains player 1's turn
    });

    test('AI is invoked correctly in single-player mode', () => {
        _testExports.setCurrentPlayer(2); // Set to AI's turn
        _testExports.setIsSinglePlayer(true); // Set single-player mode
        askNumber(); // Should trigger AI's turn
        expect(aiTurn).toHaveBeenCalledWith(_testExports.getTotalScore(), expect.any(Function));
    });

    test('Game continues if total score is less than 100', () => {
        _testExports.setTotalScore(90);
        processNumber('9');
        expect(_testExports.getTotalScore()).toBe(99);
        expect(logSpy).not.toHaveBeenCalledWith(expect.stringContaining('wins!'));
    });

 
});     

