import React, { useState } from 'react';
import './App.css';
import GameBoard from './components/GameBoard/GameBoard';
import PlayerStats from './components/PlayerStats/PlayerStats';
import Modal from './components/Modal/Modal';

function App() {
  const [board, setBoard] = useState<string[][]>(Array(3).fill(Array(3).fill('')));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [winner, setWinner] = useState<string | null>(null);
  const [gamesPlayed, setGamesPlayed] = useState<number>(0);
  const [playerStats, setPlayerStats] = useState({ X: 0, O: 0 });

  const resetBoard = () => {
    setBoard(Array(3).fill(Array(3).fill('')));
    setCurrentPlayer('X');
    setWinner(null);
  };

  const checkWin = (board: string[][]): string | null => {
    const lines = [
      ...board,

      ...board[0].map((_, col) => board.map((row) => row[col])),

      board.map((_, idx) => board[idx][idx]),
      board.map((_, idx) => board[idx][board.length - idx - 1]),
    ];

    for (const line of lines) {
      if (line.every((cell) => cell === 'X')) return 'X';
      if (line.every((cell) => cell === 'O')) return 'O';
    }

    if (board.every((row) => row.every((cell) => cell !== ''))) {
      return 'Draw';
    }

    return null;
  };

  const handleCellClick = (row: number, col: number) => {
    if (board[row][col] || winner) return;

    const newBoard = board.map((r, rowIndex) =>
      r.map((cell, colIndex) => (rowIndex === row && colIndex === col ? currentPlayer : cell)),
    );

    setBoard(newBoard);
    const result = checkWin(newBoard);

    if (result) {
      setWinner(result);
      setGamesPlayed((prev) => prev + 1);

      if (result !== 'Draw') {
        setPlayerStats((prev) => ({
          ...prev,
          [result]: prev[result as 'X' | 'O'] + 1,
        }));
      }
    } else {
      setCurrentPlayer((prev) => (prev === 'X' ? 'O' : 'X'));
    }
  };

  return (
    <div className="App">
      <h1>Хрестики-Нулики</h1>
      <PlayerStats player="Гравець 1" symbol="X" wins={playerStats.X} />
      <PlayerStats player="Гравець 2" symbol="O" wins={playerStats.O} />
      <GameBoard board={board} onCellClick={handleCellClick} />
      <p>Зіграно ігор: {gamesPlayed}</p>
      <p>Зараз ходить: {currentPlayer}</p>
      {winner && (
        <Modal
          message={
            winner === 'Draw'
              ? 'Нічия! Спробуйте ще раз :)'
              : `Гравець ${winner === 'X' ? '1' : '2'} переміг. Вітаємо!`
          }
          onClose={resetBoard}
        />
      )}
    </div>
  );
}

export default App;
