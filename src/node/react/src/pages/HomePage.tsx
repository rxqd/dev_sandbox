import Game from "@/components/TicTacToe/Game";
import BentoGrid from "@/components/BentoGrid/BentoGrid";

const HomePage = () => {
    return <>
        <Game />
        <hr/>
        <h2 className="text-center text-2xl mt-2">BentoGrid</h2>
        <BentoGrid />
      </>
    }

export default HomePage;