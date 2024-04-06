export type BoardProps = {
    size: number;
    xnext: boolean;
    squares: SquareValue[];
    onPlay: HandlePlayFunc;
};

export type SquareValue = "X" | "O" | null;

export type HandleClickFunc = (key: number) => void;
export type HandlePlayFunc =  (squares: SquareValue[]) => void

export type SquareProps = {
    value: SquareValue;
    onSquareClick: () => void
}

export type BoardRowProps = {
    columns: Array<SquareValue>;
    row: number;
    handleClick: HandleClickFunc;
}
