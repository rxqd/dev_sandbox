import {type DigitProps} from "./types";

const Digit = ({value, index}: DigitProps) => {
    return (
        <div className="border flex-1 flex-wrap p-1 h-5 w-5" key={"d-"+index}>
            {value}
        </div>
    );
};

export default Digit;