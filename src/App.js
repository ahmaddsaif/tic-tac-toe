import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function Square({value, onSquareClicked}) {
  return (
    <button class="square" onClick={onSquareClicked}>{value}</button>
  );
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  function handleSquareClicked(i) {
    if(squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if(xIsNext) {
      nextSquares[i] = 'X';
    }
    else {
      nextSquares[i] = 'O';
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  return (
    <div>
      <div className='status'>{status}</div>
      <div className='board-row'>
        <Square value={squares[0]} onSquareClicked={() => handleSquareClicked(0)} />
        <Square value={squares[1]} onSquareClicked={() => handleSquareClicked(1)} />
        <Square value={squares[2]} onSquareClicked={() => handleSquareClicked(2)} />
      </div>
      <div className='board-row'>
        <Square value={squares[3]} onSquareClicked={() => handleSquareClicked(3)} />
        <Square value={squares[4]} onSquareClicked={() => handleSquareClicked(4)} />
        <Square value={squares[5]} onSquareClicked={() => handleSquareClicked(5)} />
      </div>
      <div className='board-row'>
        <Square value={squares[6]} onSquareClicked={() => handleSquareClicked(6)} />
        <Square value={squares[7]} onSquareClicked={() => handleSquareClicked(7)} />
        <Square value={squares[8]} onSquareClicked={() => handleSquareClicked(8)} />
      </div>
    </div>
  )
}