import useSudoku from "@/hooks/useSudoku";
import Square from "./Square";

const Board = () => {
    const [array, _setArray] = useSudoku();
    
    return (
        <div className="flex border w-90 h-90 bg-blue-900 text-white gap-1">
            {array.map((digits, index) => {
            return (
                <Square index={index} digits={digits}/>
            )
            })}
        </div>
    );
};

export default Board;