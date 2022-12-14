import { useState, useEffect } from "react";
import cardsData from "./CardsData";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import "../style/DeckDrow.scss";
const DeckDraw = () => {
  const [playerHand, setPlayerHand] = useState([]);
  const [croupierHand, setCroupierHand] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [croupierScore, setCroupierScore] = useState(0);
  const [deck, setDeck] = useState(cardsData);
  const [stop, setStop] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [startTheGame, setStartTheGame] = useState(true);
  const [gameSet, setGameSet] = useState(false);
  const [playerWin, setPlayerWin] = useState(0);
  const [croupierWin, setCroupierWin] = useState(0);

  useEffect(() => {
    if (playerScore > 7.5) {
      setShowResult(true);
    }
  }, [playerScore]);

  const draw = (deckAfterFirstDraw) => {
    try {
      if(!deckAfterFirstDraw){
        const value = deck[Math.floor(Math.random() * deck.length)];
        const newDeck = deck.filter((card) => card !== value);
        setDeck(newDeck);
        return value;
      }else {
        const value = deckAfterFirstDraw[Math.floor(Math.random() * deckAfterFirstDraw.length)];
        const newDeck = deckAfterFirstDraw.filter((card) => card !== value);
        setDeck(newDeck);
        return value;
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  const firstDraw = () => {
    try {
      const value = deck[Math.floor(Math.random() * deck.length)];
      const newDeck = deck.filter((card) => card !== value);
      return {firstCardPlayer: value, newDeck}
    } catch (error) {
      console.log(error);
    }
  }

  const startGame = () => {
    debugger
    try {
      const {firstCardPlayer, newDeck} = firstDraw();
      setPlayerHand([firstCardPlayer]);
      if (firstCardPlayer.name === "ReDenari") {
        setPlayerScore(7);
      } else {
        setPlayerScore(firstCardPlayer.value);
      }
      setTimeout(() => {
        const firstCardCroupier = draw(newDeck);
        setCroupierHand([firstCardCroupier]);
        if (firstCardCroupier.name === "ReDenari") {
          setCroupierScore(7);
        } else {
          setCroupierScore(firstCardCroupier.value);
        }
      }, 1000);

      setStartTheGame(false);
      setGameSet(true);
    } catch (error) {
      console.log(error);
    }
  };

  const playerDraw = () => {
    debugger
    try {
      const value = draw();
      setPlayerHand((playerHand) => [...playerHand, value]);
      console.log(playerHand);
      if (
        playerHand[0].name === "ReDenari" &&
        (value.value === 1 || 2 || 3 || 4 || 5 || 6)
      ) {
        setPlayerScore(7);
      } else if (
        value.name === "ReDenari" &&
        (playerScore === 0.5 || 1.5 || 2.5 || 3.5 || 4.5 || 5.5 || 6.5)
      ) {
        setPlayerScore(7.5);
      } else if (
        playerHand[0].name === "ReDenari" &&
        (value.value === 0.5 || 1.5 || 2.5 || 3.5 || 4.5 || 5.5 || 6.5)
      ) {
        setPlayerScore(7.5);
      } else if (
        value.name === "ReDenari" &&
        (playerScore === 0 || 1 || 2 || 3 || 4 || 5 || 6)
      ) {
        setPlayerScore(7);
      } else {
        setPlayerScore(playerScore + value.value);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const croupierDraw = () => {
    if (stop === true && croupierScore < 5) {
      const value = draw();
      setCroupierHand((croupierHand) => [...croupierHand, value]);
      if (
        croupierHand[0].name === "ReDenari" &&
        (value.value === 1 || 2 || 3 || 4 || 5 || 6)
      ) {
        setCroupierScore(7);
      } else if (
        value.name === "ReDenari" &&
        (croupierScore === 0.5 || 1.5 || 2.5 || 3.5 || 4.5 || 5.5 || 6.5)
      ) {
        setCroupierScore(7.5);
      } else if (
        value.name === "ReDenari" &&
        (croupierScore === 0 || 1 || 2 || 3 || 4 || 5 || 6)
      ) {
        setCroupierScore(7);
      } else {
        setCroupierScore(croupierScore + value.value);
      }
      setShowResult(true);
    } else if (stop === true) {
      setStop(false);
      setShowResult(true);
    }
  };

  const results = () => {
    if (showResult === true) {
      if (
        (croupierScore < playerScore && playerScore < 8) ||
        croupierScore > 7.5
      ) {
        return <h1 className="results">Vittoria</h1>;
      } else if (croupierScore === playerScore) {
        return <h1 className="results">Pareggio</h1>;
      } else {
        return <h1 className="results">Sconfitta</h1>;
      }
    }
  };

  const restartTheGame = () => {
    setDeck(cardsData);
    setCroupierHand([]);
    setPlayerHand([]);
    setStop(false);
    setPlayerScore(0);
    setCroupierScore(0);
    setShowResult(false);
    setStartTheGame(true);
    setGameSet(false);
    if (
      (croupierScore < playerScore && playerScore < 8) ||
      croupierScore > 7.5
    ) {
      setPlayerWin(playerWin + 1);
    } else if (croupierScore === playerScore) {
      return;
    } else {
      setCroupierWin(croupierWin + 1);
    }
  };

  const renderCards = (card) => {
    if (card.length === 0) {
      return null;
    } else {
      return card.map((card, index) => {
        return (
          <Col key={index} className="col-12 col-md-4 my-2">
            <Card>
              <Card.Img src={card.img} height="40%" />
            </Card>
          </Col>
        );
      });
    }
  };

  return (
    <Container id="DeckDrowContainer" fluid className="bg-primary">
      {croupierDraw()}

      <Row className="justify-content-center">
        <Col xs={4}>
          <Row className="me-5">{renderCards(playerHand)}</Row>
        </Col>

        <Col xs={3}>
          <Stack className="buttons" gap={3}>
            <Row>
              <Button
                className="mt-md-3"
                disabled={startTheGame ? false : true}
                variant="info"
                onClick={startGame}
              >
                Inizia partita
              </Button>
            </Row>
            <Row>
              <Button
                className="mt-md-3"
                disabled={gameSet ? false : true}
                variant="info"
                onClick={playerDraw}
              >
                Carta
              </Button>
            </Row>
            <Row>
              <Button
                className="mt-md-3"
                disabled={gameSet ? false : true}
                variant="info"
                onClick={() => setStop(true)}
              >
                Stai
              </Button>
            </Row>
            <Row>
              <Button
                className="mt-md-3"
                variant="info"
                onClick={restartTheGame}
              >
                Rigioca
              </Button>
            </Row>
          </Stack>
        </Col>
        <Col xs={4}>
          <Row className="ms-5">{renderCards(croupierHand)}</Row>
        </Col>
      </Row>
      <Row className="my-5 d-flex text-center text-secondary">
        <Col>
          <h2>{playerScore}</h2>
        </Col>
        <Col>
          <h2>{results()}</h2>
        </Col>
        <Col>
          <h2>{croupierScore}</h2>
        </Col>
      </Row>
      {/* Totale vittorie */}
      <Container>
        <Row className="TotalScore py-3">
          <h2>Vittorie totali</h2>
          <Col className="mt-2">
            <h3 id="playerScore">{playerWin}</h3>
          </Col>
          <Col className="mt-2">
            <h3 id="croupierScore">{croupierWin}</h3>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default DeckDraw;
