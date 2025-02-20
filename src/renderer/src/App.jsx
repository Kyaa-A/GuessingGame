import React, { useState, useEffect } from 'react';

const App = () => {
    const [guess, setGuess] = useState('');
    const [message, setMessage] = useState('');
    const [randomNumber, setRandomNumber] = useState(0);
    const [attempts, setAttempts] = useState(0);

    // Generate random number when app loads
    useEffect(() => {
        generateRandomNumber();
    }, []);

    const generateRandomNumber = () => {
        const number = Math.floor(Math.random() * 100) + 1;
        setRandomNumber(number);
        setMessage('Guess a number between 1 and 100!');
        setAttempts(0);
    };

    const handleInputChange = (e) => {
        setGuess(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const userGuess = parseInt(guess);
        setAttempts(attempts + 1);

        if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
            setMessage('Please enter a valid number between 1 and 100.');
            return;
        }

        if (userGuess === randomNumber) {
            setMessage(`🎉 Correct! You guessed the number in ${attempts + 1} attempts.`);
        } else if (userGuess > randomNumber) {
            setMessage('📈 Too high! Try again.');
        } else {
            setMessage('📉 Too low! Try again.');
        }

        setGuess('');
    };

    const handleReset = () => {
        generateRandomNumber();
        setGuess('');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
            <h1 className="text-4xl font-bold mb-6">🎲 Number Guessing Game</h1>
            <p className="mb-4 text-lg">{message}</p>

            <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md">
                <label htmlFor="guess" className="block text-lg mb-2">Enter your guess:</label>
                <input
                    type="number"
                    id="guess"
                    value={guess}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Type a number between 1 and 100"
                    required
                />

                <button
                    type="submit"
                    className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
                >
                    Submit Guess
                </button>

                <button
                    type="button"
                    onClick={handleReset}
                    className="mt-2 w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg"
                >
                    🔄 Reset Game
                </button>
            </form>
        </div>
    );
};

export default App;
