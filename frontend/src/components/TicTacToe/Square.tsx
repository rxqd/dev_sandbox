import {type SquareProps} from "./types";

export default function Square({value, onSquareClick}: SquareProps)  {
  return (
  <button className="bg-white float-left border border-gray-300 p-0 text-2xl font-bold h-8 w-8 text-center" onClick={onSquareClick}>
  {value}
  </button>
  );
}
