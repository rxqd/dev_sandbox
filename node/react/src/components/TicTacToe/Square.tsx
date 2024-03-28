import {type SquareProps} from "./types";

export default function Square({value, onSquareClick}: SquareProps)  {
  return (
  <button className="square" onClick={onSquareClick}>
  {value}
  </button>
  );
}
