import { useState } from 'react';

type SudokuState = [
    array: string[][],
    setArrray: (array: string[][]) => void
 ];

const useSudoku = (): SudokuState => {
    const [array, setArray] = useState(createTestArray());

    return [
        array,
        setArray,
    ];
};

export default useSudoku;

function createTestArray(): string[][] {
  const grid = [];
  const digits = "123456789";
  const _shuffle = (str: string): string => [...str].sort(()=>Math.random()-.5).join('');
    
  for (let i = 0; i < 9; i++) {
    grid[i] = [...digits]
  }
  return grid;
}

