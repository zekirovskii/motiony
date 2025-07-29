import Hero from '../components/Hero/Hero';
import Trending from "../components/Trending/Trending";
import LatestTrailers from "../components/LatestTrailers/LatestTrailers";
import WhatsPopular from "../components/WhatsPopular/WhatsPopular";

export default function Home() {
  return (
      <>
      <Hero />
      <Trending />
      <LatestTrailers />
      <WhatsPopular />
    </>
  );
}