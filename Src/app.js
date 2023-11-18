import * as React from "react";
import { useEffect, useState } from "react";

function Board({ isRestarted, setIsRestarted }) {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("O");
  const [status, setStatus] = useState(null);

  const selectSquare = (square) => {
    if (squares[square] || calculateWinner(squares)) {
      return; // Do nothing if the square is already filled or there's a winner.
    }

    const nextPlayer = calculateNextPlayer(squares);
    squares[square] = nextPlayer;
    setCurrentPlayer(nextPlayer);

    const winner = calculateWinner(squares);
    setStatus(calculateStatus(winner, squares, nextPlayer));

    setIsRestarted(false);
  };

  const restart = () => {
    setSquares(Array(9).fill(null));
    setStatus("");
  };

  useEffect(() => {
    if (isRestarted) {
      restart();
    }
  }, [isRestarted]);

  const renderSquare = (i) => (
    <button
      className="w-32 h-32 bg-slate-900 border-white border-2 text-white text-4xl font-bold"
      onClick={() => selectSquare(i)}>
      {squares[i]}
    </button>
  );

  return (
    <div className="bg-zinc-100 shadow-xl rounded-lg flex justify-center items-center flex-col p-0 lg:p-10">
      <div className="font-bold tracking-widest text-2xl text-center mb-10">
        <p>STATUS</p>
        <p>{status}</p>
      </div>
      <div className="grid grid-cols-3">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="grid grid-cols-3">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="grid grid-cols-3 mb-10">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

function Game() {
  const [isRestarted, setIsRestarted] = useState(false);

  const handleRestart = () => {
    setIsRestarted(true);
  };

  return (
    <div className="h-screen">
      <div className="w-[90%] lg:w-[40%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Board isRestarted={isRestarted} setIsRestarted={setIsRestarted} />
      </div>
      <div className="flex justify-center items-center">
        <button
          onClick={handleRestart}
          className="py-2 px-5 bg-indigo-950 text-white flex items-center justify-center">
          restart
        </button>
      </div>
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, currentPlayer) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${currentPlayer}`;
}

// eslint-disable-next-line no-unused-vars
function calculateNextPlayer(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? "X" : "O";
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
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
      return squares[a];
    }
  }
  return null;
}

function App() {
  return <Game />;
}

export default App;
