import {type SquareProps} from "./types";
import Digit from "./Digit";

const Square = ({digits, index}: SquareProps) => {
    return (
        <div key={"sq-"+index} className="flex flex-1 flex-wrap justify-center items-center w-1/3 h-1/3 gap-1">
          {digits.map((digit, i) => <Digit value={digit} index={i} />)}
        </div>
    );
};

export default Square;