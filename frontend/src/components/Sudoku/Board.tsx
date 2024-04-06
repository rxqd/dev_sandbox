import useSudoku from "@/hooks/useSudoku";
import Square from "./Square";

const Board = () => {
  const [array, _setArray] = useSudoku();

  return (
    <div className="w-90 h-90 grid grid-cols-3 grid-rows-3 gap-2 border bg-sky-900">
      {array.map((digits, _index) => {
        return (
          <Square digits={digits} />
        )
      })}
    </div>
  );
};

export default Board;
