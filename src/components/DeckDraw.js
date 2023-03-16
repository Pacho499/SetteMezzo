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
  const [gameSettings, setGameSettings] = useState({
    deck: cardsData,
    showResult: false, 
    start: true,
    gameSet: false,
    stop: false, 
    canDraw : false,
    reGame : false
  })

  const [playerInfo, setPlayerInfo] = useState({
    playerHand:[],
    playerScore:0,
    playerWin:0,
  })

  const [croupierInfo, setCroupierInfo] = useState({
    croupierHand:[],
    croupierScore:0,
    croupierWin:0
  })

  useEffect(() => {
    if (playerInfo.playerScore > 7.5) {
      setGameSettings({...gameSettings, showResult:true});
    }
  }, [playerInfo.playerScore]);

  const draw = (deckAfterFirstDraw) => {
    try {
      if(!deckAfterFirstDraw){
        const deck = gameSettings.deck
        const drawCard = deck[Math.floor(Math.random() * deck.length)];
        const newDeck = deck.filter((card) => card !== drawCard);
        setGameSettings({...gameSettings, deck:newDeck})
        return drawCard;
      }else {
        const drawCard = deckAfterFirstDraw[Math.floor(Math.random() * deckAfterFirstDraw.length)];
        const newDeck = deckAfterFirstDraw.filter((card) => card !== drawCard);
        setGameSettings({...gameSettings, deck:newDeck})
        return drawCard;
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  const firstDraw = () => {
    const deck = gameSettings.deck
    try {
      const drawCard = deck[Math.floor(Math.random() * deck.length)];
      const newDeck = deck.filter((card) => card !== drawCard);
      return {card: drawCard, newDeck}
    } catch (error) {
      console.log(error);
    }
  }
  
  const croupierFirstDraw = (deck) => {
    const firstCardCroupier = draw(deck);
    setCroupierInfo({...croupierInfo, croupierScore:firstCardCroupier.value, croupierHand:[firstCardCroupier]})
  }


  const startGame = () => {
    try {
      const {card, newDeck} = firstDraw();
      setPlayerInfo({...playerInfo, playerScore:card.value, playerHand:[card]})
      croupierFirstDraw(newDeck)
      setGameSettings({...gameSettings, start:false, gameSet:true, canDraw:true})
    } catch (error) {
      console.log(error);
    }
  };

  const firstCardReDenari = (card, isPlayer) => {
    switch (card.value) {
        case 0.5 || 1.5 || 2.5 || 3.5 || 4.5 || 5.5 || 6.5:
          if(isPlayer){
            setPlayerInfo({...playerInfo, playerScore:7.5, playerHand:[...playerInfo.playerHand, card]})
          }else{
            setCroupierInfo({...croupierInfo, croupierScore:7.5, croupierHand:[...croupierInfo.croupierHand, card]})
          }
          break;
        default:
          if(isPlayer){
            setPlayerInfo({...playerInfo, playerScore:7, playerHand:[...playerInfo.playerHand, card] })
          }else{
            setCroupierInfo({...croupierInfo, croupierScore:7, croupierHand:[...croupierInfo.croupierHand, card]})
          }
          break;
      }
  }

  const drawCardReDenari = (card, isPlayer) => {
    switch (isPlayer ? playerInfo.playerScore : croupierInfo.croupierScore) {
      case 0.5 || 1.5 || 2.5 || 3.5 || 4.5 || 5.5 || 6.5:
        if(isPlayer){
          setPlayerInfo({...playerInfo, playerScore:7.5, playerHand:[...playerInfo.playerHand, card]})
        }else{
          setCroupierInfo({...croupierInfo, croupierScore:7.5, croupierHand:[...croupierInfo.croupierHand, card]})
        }
        break;
      default:
        if(isPlayer){
          setPlayerInfo({...playerInfo, playerScore:7, playerHand:[...playerInfo.playerHand, card]})
        }else{
          setCroupierInfo({...croupierInfo, croupierScore:7, croupierHand:[...croupierInfo.croupierHand, card]})
        }
        break;
    }
  }
  
  const playerDraw = () => {
    try {
      const card = draw();
      if(playerInfo.playerHand[0].name === 'ReDenari'){
        firstCardReDenari(card, true)
      }else if (card.name === 'ReDenari'){
        drawCardReDenari(card,true)
      }else{
       setPlayerInfo({...playerInfo, playerScore: playerInfo.playerScore + card.value, playerHand:[...playerInfo.playerHand, card]}) 
      }
    } catch (error) {
      console.log(error);
    }
  };

  const croupierDraw = () => {
    if (gameSettings.stop === true && croupierInfo.croupierScore < 5) {
      const card = draw();
      if (croupierInfo.croupierHand[0].name === 'ReDenari'){
        firstCardReDenari(card, false)
      }else if (card.name === 'ReDenari'){
        drawCardReDenari(card, false)
      }else {
        setCroupierInfo({...croupierInfo, croupierScore:croupierInfo.croupierScore + card.value, croupierHand:[...croupierInfo.croupierHand, card]})
      }
      setGameSettings({...gameSettings, stop:false, canDraw:false})
      setTimeout(() => {
        setGameSettings({...gameSettings, stop:true})
      }, 1000);
    } else if (gameSettings.stop === true) {
      setGameSettings({...gameSettings, stop:false, reGame:true, gameSet:false , showResult:true, canDraw:false})
    }
  };

  const results = () => {
    if (gameSettings.showResult === true) {
      if (
        (croupierInfo.croupierScore < playerInfo.playerScore && playerInfo.playerScore < 8) ||
        croupierInfo.croupierScore > 7.5
      ) {
        return <h1 className="results">Vittoria</h1>;
      } else if (croupierInfo.croupierScore === playerInfo.playerScore) {
        return <h1 className="results">Pareggio</h1>;
      } else {
        return <h1 className="results">Sconfitta</h1>;
      }
    }
  };

  const restartTheGame = () => {
    setGameSettings({
      deck:cardsData,
      stop:false,
      showResult:false,
      start:true,
      gameSet:false
    })
    if (
      (croupierInfo.croupierScore < playerInfo.playerScore && playerInfo.playerScore < 8) ||
      croupierInfo.croupierScore > 7.5
    ) {
      setPlayerInfo({
        playerHand:[],
        playerScore:0,
        playerWin: playerInfo.playerWin + 1
      })
      setCroupierInfo({
        croupierHand:[],
        croupierScore:0,
        croupierWin: croupierInfo.croupierWin
      })
    } else if (croupierInfo.croupierScore === playerInfo.playerScore) {
      setPlayerInfo({
        playerHand:[],
        playerScore:0,
        playerWin: playerInfo.playerWin
      })
      setCroupierInfo({
        croupierHand:[],
        croupierScore:0,
        croupierWin: croupierInfo.croupierWin
      })
    } else {
      setCroupierInfo({
        croupierHand:[],
        croupierScore:0,
        croupierWin: croupierInfo.croupierWin + 1
      })
      setPlayerInfo({
        playerHand:[],
        playerScore:0,
        playerWin: playerInfo.playerWin
      })
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
          <Row className="me-5">{renderCards(playerInfo.playerHand)}</Row>
        </Col>

        <Col xs={3}>
          <Stack className="buttons" gap={3}>
            <Row>
              <Button
                className="mt-md-3"
                disabled={gameSettings.start ? false : true}
                variant="info"
                onClick={startGame}
              >
                Inizia partita
              </Button>
            </Row>
            <Row>
              <Button
                className="mt-md-3"
                disabled={gameSettings.canDraw ? false : true}
                variant="info"
                onClick={playerDraw}
              >
                Carta
              </Button>
            </Row>
            <Row>
              <Button
                className="mt-md-3"
                disabled={gameSettings.gameSet ? false : true}
                variant="info"
                onClick={() => setGameSettings({...gameSettings, stop:true})}
              >
                Stai
              </Button>
            </Row>
            <Row>
              <Button
                className="mt-md-3"
                variant="info"
                onClick={restartTheGame}
                disabled={gameSettings.reGame ? false : true}
              >
                Rigioca
              </Button>
            </Row>
          </Stack>
        </Col>
        <Col xs={4}>
          <Row className="ms-5">{renderCards(croupierInfo.croupierHand)}</Row>
        </Col>
      </Row>
      <Row className="my-5 d-flex text-center text-secondary">
        <Col>
          <h2>{playerInfo.playerScore}</h2>
        </Col>
        <Col>
          <h2>{results()}</h2>
        </Col>
        <Col>
          <h2>{croupierInfo.croupierScore}</h2>
        </Col>
      </Row>
      {/* Totale vittorie */}
      <Container>
        <Row className="TotalScore py-3">
          <h2>Vittorie totali</h2>
          <Col className="mt-2">
            <h3 id="playerScore">{playerInfo.playerWin}</h3>
          </Col>
          <Col className="mt-2">
            <h3 id="croupierScore">{croupierInfo.croupierWin}</h3>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default DeckDraw;
