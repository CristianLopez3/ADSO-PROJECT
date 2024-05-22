import Hero from "./components/Hero";
import Booking from "./components/Booking";
import KnowUs from "./components/KnowUs";


const Home = () => {
  return (
    <div className="relative pb-0">
      <header>
        <Hero />
      </header>
      <main>
        <Booking />
        <KnowUs />
      </main>
    </div>
  );
};


export default Home;
