import "./styles.css";

import { useState } from "react";
import BoardRow from "./BoardRow";

import { type BoardProps, type SquareValue } from "./types";

export default function Board({ size = 3 }: BoardProps) {
    const [squares, setSquares] = useState(Array(size * size).fill(null));
    const [xnext, setXnext] = useState(true);

    const winner = calculateWinner(squares);
      let status: string;
    
      if (winner) {
        status = "Winner: " + winner;
      } else {
        status = "Next player: " + (xnext ? "X" : "O");
      }

    const handleClick = (index: number): void => {
        if(squares[index] || winner) {
            return;
        }
            
        const nextSquares = squares.slice();

        nextSquares[index] = xnext ? "X" : "O";
        setSquares(nextSquares);
        setXnext(!xnext);
    };

    const renderBoard = () => {
        const rows = [];

        for (let i = 0; i < squares.length; i += size) {
            const columns = squares.slice(i, i + size);
            rows.push(
                <BoardRow
                    row={i}
                    columns={columns}
                    handleClick={handleClick}
                />,
            );
        }

        return rows;
    };

    return (
        <div className="board">
            <div className="status">{status}</div>
        {renderBoard()}
        </div>
    );
}

function calculateWinner(squares: SquareValue[]): SquareValue {
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