import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import logo from "../images/setteDenari.png";

const HeaderNav = () => {
  return (
    <Navbar color="yellow" bg="secondary" expand="lg">
      <Container fluid>
        <Navbar.Brand>
          <img className="ms-5" src={logo} alt="logo" width="40" height="65" />
        </Navbar.Brand>
        <Navbar.Text>
          <h1 className="me-5" style={{ color: "yellow" }}>
            Sette e mezzo
          </h1>
        </Navbar.Text>
      </Container>
    </Navbar>
  );
};

export default HeaderNav;
