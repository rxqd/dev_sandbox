import Game from "@/components/TicTacToe/Game";
import BentoGrid from "@/components/BentoGrid/BentoGrid";

const HomePage = () => {
  return (
    <div className="container mx-auto p-6">
      <Game />
      <hr className="mt-4" />
      <h2 className="mt-2 text-center text-2xl">BentoGrid</h2>
      <BentoGrid />
    </div>
  )
}

export default HomePage;
