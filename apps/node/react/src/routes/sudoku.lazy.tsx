import { createLazyFileRoute } from '@tanstack/react-router';
import SudokuGamePage from "@/pages/SudokuGamePage";

export const Route = createLazyFileRoute('/sudoku')({
  component: SudokuGamePage,
})