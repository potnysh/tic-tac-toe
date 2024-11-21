import './GameBoard.css';

interface GameBoardProps {
  board: string[][];
  onCellClick: (row: number, col: number) => void;
}

function GameBoard({ board, onCellClick }: GameBoardProps) {
  return (
    <div
      className="game-board"
      style={{
        gridTemplateColumns: `repeat(${board.length}, 1fr)`,
      }}>
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <button
            key={`${rowIndex} ${colIndex}`}
            onClick={() => onCellClick(rowIndex, colIndex)}
            className="game-cell">
            {cell}
          </button>
        )),
      )}
    </div>
  );
}

export default GameBoard;
