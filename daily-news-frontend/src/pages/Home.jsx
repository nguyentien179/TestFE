import BreakingNewsTicker from "../components/BreakingNewsTicker";
import CategoryHighlights from "../components/CategoryHighlights";
import TrendingTopics from "../components/TrendingTopics";

const Home = () => {
  return (
    <div>
      <BreakingNewsTicker />
      <TrendingTopics />
      <CategoryHighlights />
    </div>
  );
};

export default Home;
