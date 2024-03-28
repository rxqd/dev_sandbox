import "./styles.css";

import { useState } from 'react';
import Square from "./Square";

export default Board({size:number = 3}) {
  const [squares, setSquares] = useState(Array(size*size).fill(null));
  
  handleClick = (index: number) => {
    const nextSquares = squares.slice();
    nextSquares[index] = "X";
    setSquares(nextSquares);
  }
  
  renderBoard = () => {
    const rows = []
    
    for(i=0; i<squares.length;i+=size) {
        rows.push(<div className="board-row">)
        
        for(j=i;j<i+size;j++) {
          rows.push(<Square key={j}
                            value={squares[j] 
                              onSquareClick={() => handleClick(j)}/>)
        }
        
        rows.push(</div>)
      }
      
      return rows;
  }
  
  return (
    <>
    {renderBoard()} 
    </>
  );
}