import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ArticlesList } from "src/features/article/components/ArticlesList";

const Home = () => {
  return (
    <div className="p-4">
      <Header />
      <Hero />
      <ArticlesList />
    </div>
  );
};

export default Home;
