import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function Square({value, onSquareClicked}) {
  return (
    <button class="square" onClick={onSquareClicked}>{value}</button>
  );
}

function Board({xIsNext, squares, onPlay}) {
  // const [squares, setSquares] = useState(Array(9).fill(null));
  // const [xIsNext, setXIsNext] = useState(true);

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
    onPlay(nextSquares);
    // setSquares(nextSquares);
    // setXIsNext(!xIsNext);
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

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;

    if(move > 0) {
      description = 'Go to move ' + move;
    }
    else {
      description = 'Go to game start';
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  })

  return (
    <div className='game'>
      <div class="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className='game-info'>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}