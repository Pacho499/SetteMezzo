import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import ListGroup from "react-bootstrap/ListGroup";

const Example = () => {
  const [open, setOpen] = useState(false);

  return (
    <Container className="my-4">
      <Button
        variant="info"
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
      >
        Regole
      </Button>
      <Collapse in={open}>
        <div id="example-collapse-text">
          <ListGroup>
            <ListGroup.Item variant="info">
              Il banco deve tirare con 4.5 e stare con 5
            </ListGroup.Item>
            <ListGroup.Item variant="info">
              Se hai un punteggio più alto del croupier vinci
            </ListGroup.Item>
            <ListGroup.Item variant="info">
              Per vedere i risultati devi sempre scegliere quando stare
            </ListGroup.Item>
          </ListGroup>
        </div>
      </Collapse>
    </Container>
  );
};

export default Example;
