import { type DigitProps } from "./types";

const Digit = ({ value }: DigitProps) => {
  return (
    <div className="flex cursor-pointer items-center justify-center border p-1 text-lg text-sky-100">
      {value}
    </div>
  );
};

export default Digit;
