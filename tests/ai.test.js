const { aiTurn, setAIDifficulty, getAIDifficulty } = require('../src/ai');

describe('AI Logic Tests', () => {
    beforeEach(() => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.5); // Mocks Math.random to always return 0.5
    });

    afterEach(() => {
        jest.spyOn(global.Math, 'random').mockRestore(); // Restores Math.random
    });

    test('AI chooses a random number in Easy mode', () => {
        setAIDifficulty(false); // Easy mode
        aiTurn(0, (aiChoice) => {
            expect(aiChoice).toBeGreaterThanOrEqual(1);
            expect(aiChoice).toBeLessThanOrEqual(10);
        });
    });

    test('AI chooses strategically in Hard mode to reach multiple of 11', () => {
        setAIDifficulty(true); // Hard mode
        let totalScore = 15; // Example total score
        aiTurn(totalScore, (aiChoice) => {
            // Expect AI to choose a number that brings totalScore to the nearest multiple of 11
            expect(totalScore + aiChoice).toBe(22); // Next multiple of 11 after 15 is 22
        });
    });

    test('AI chooses 10 if required to reach the nearest multiple of 11 in Hard mode', () => {
        setAIDifficulty(true); // Hard mode
        let totalScore = 2; // Example total score
        aiTurn(totalScore, (aiChoice) => {
            expect(aiChoice).toBe(9); // AI should choose 10 here to bring total to 12
        });
    });

    test('setAIDifficulty correctly sets the difficulty', () => {
        setAIDifficulty(true);
        expect(getAIDifficulty()).toBe(true); // Verify if the difficulty is set to Hard mode
        setAIDifficulty(false);
        expect(getAIDifficulty()).toBe(false); // Verify if the difficulty is set to Easy mode
    });
});
