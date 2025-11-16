'use client';
import { useState } from "react";
import styles from "./page.module.css";

// Square component now gets isWinner
function Square({
  value,
  onSquareClick,
  isWinner
}: {
  value: string | null;
  onSquareClick: () => void;
  isWinner: boolean;
}) {
  const classNames = [styles.square];
  if (isWinner) classNames.push(styles.winner);

  return (
    <button className={classNames.join(" ")} onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null));

  const winnerInfo = calculateWinner(squares);
  const winner = winnerInfo?.player ?? null;
  const winningLine = winnerInfo?.line ?? [];

  const isDraw = !winner && squares.every((v) => v !== null);

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (isDraw) {
    status = "Draw!";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  function handleClick(i: number) {
    // Stop moves if there's already a winner or the square is taken
    if (squares[i] || winnerInfo) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";

    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function handleReset() {
    // Reset board and start again with X
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <div className={styles.game}>
      <div className={styles.status}>{status}</div>

      <button className={styles.resetButton} onClick={handleReset}>
        Reset Game
      </button>

      <div className={styles.boardRow}>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} isWinner={winningLine.includes(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} isWinner={winningLine.includes(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} isWinner={winningLine.includes(2)} />
      </div>

      <div className={styles.boardRow}>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} isWinner={winningLine.includes(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} isWinner={winningLine.includes(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} isWinner={winningLine.includes(5)} />
      </div>

      <div className={styles.boardRow}>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} isWinner={winningLine.includes(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} isWinner={winningLine.includes(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} isWinner={winningLine.includes(8)} />
      </div>
    </div>
  );
}

// Updated function — returns both winner and winning line
function calculateWinner(squares: (string | null)[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        player: squares[a],
        line: [a, b, c],
      };
    }
  }
  return null;
}
