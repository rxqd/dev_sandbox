import Square from "./Square";
import {type BoardRowProps} from "./types";

export default function BoardRow({row, handleClick, columns}: BoardRowProps) {
    return (
            <div>
                {columns.map((value, index) => (
                    <Square key={`${row}-${index}`}
                            value={value} 
                            onSquareClick={() => handleClick(row+index)}/>
                ))} 
            </div>
        )
}
