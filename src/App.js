import DeckDraw from "./components/DeckDraw";
import HeaderNav from "./components/HeaderNav";
import Rules from "./components/Rules";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <header>
        <HeaderNav />
      </header>
      <Rules />
      <DeckDraw />
      <Footer />
    </div>
  );
}

export default App;
