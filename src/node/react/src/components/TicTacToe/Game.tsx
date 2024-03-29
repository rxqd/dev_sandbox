import Board from "./Board";
import {useState} from "react";
import {type SquareValue} from "./types";

export default function Game() {
    const size = 3;
    const initSquares: SquareValue[] = Array(size*size).fill(null);
    
    const [history, setHistory] = useState([initSquares]);
    const [currentMove, setCurrentMove] = useState(0);

    const currentSquares = history[currentMove];
    const xnext = currentMove % 2 === 0;

    const handlePlay = (squares: SquareValue[]) => {
        const nextHistory = [...history.slice(0, currentMove + 1), squares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
};

    const jumpTo = (move: number) => {
        setCurrentMove(move);
    }

    const moves = history.map((_, move) => {
        let description;
        if (move > 0) {
          description = 'Go to move #' + move;
        } else {
          description = 'Go to game start';
        }
        return (
          <li>
            <button onClick={() => jumpTo(move)}>{description}</button>
          </li>
        );
      });
    
  return (
    <div className="game">
      <div className="game-board">
        <Board size={size} squares={currentSquares} xnext={xnext} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}