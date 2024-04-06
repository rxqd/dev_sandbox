import { type SquareProps } from "./types";
import Digit from "./Digit";

const Square = ({ digits }: SquareProps) => {
  return (
    <div className="grid grid-cols-3 grid-rows-3 items-center justify-center gap-1 bg-cyan-900 ">
      {digits.map((digit, _i) => <Digit value={digit} />)}
    </div>
  );
};

export default Square;
