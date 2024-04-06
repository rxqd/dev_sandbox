import BoardRow from "./BoardRow";
import checkWinner from "./checkWinner";

import { type BoardProps } from "./types";

export default function Board({ size, squares, xnext, onPlay }: BoardProps) {
    
    const winner = checkWinner(squares);
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
        onPlay(nextSquares);
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
        <div className="m-5">
            <div className="mb-2.5">{status}</div>
        {renderBoard()}
        </div>
    );
}
