import "./styles.css";

import { useState } from "react";
import BoardRow from "./BoardRow";

import { type BoardProps } from "./types";

export default function Board({ size = 3 }: BoardProps) {
    const [squares, setSquares] = useState(Array(size * size).fill(null));

    const handleClick = (index: number): void => {
        const nextSquares = squares.slice();
        nextSquares[index] = "X";
        setSquares(nextSquares);
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

    return <div className="board">{renderBoard()}</div>;
}
