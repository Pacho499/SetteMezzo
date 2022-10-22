import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
const Footer = () => {
  return (
    <Navbar className="mt-5" color="yellow" bg="secondary" expand="lg">
      <Container fluid>
        <Navbar.Text>
          <a
            href="https://lorenzopalumbo.netlify.app/3"
            target="_blank"
            rel="noreferrer"
            style={{ color: "yellow" }}
          >
            Created by Lorenzo Palumbo
          </a>
        </Navbar.Text>
      </Container>
    </Navbar>
  );
};

export default Footer;
