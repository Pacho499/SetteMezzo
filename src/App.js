import DeckDrow from "./components/DeckDrow";
import HeaderNav from "./components/HeaderNav";
import Rules from "./components/Rules";
import Footer from "./components/Footer";

function App() {
  return (
    <div style={{ backgroundColor: "green" }}>
      <header>
        <HeaderNav />
      </header>
      <Rules />
      <DeckDrow />
      <Footer />
    </div>
  );
}

export default App;
