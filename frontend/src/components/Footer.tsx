import { Col, Container, Row } from "react-bootstrap";

interface Props {}

/**
 * Footer component
 */
const Footer = (props: Props) => {
  return (
    <footer data-testid="footer">
      <Container>
        <Row>
          <Col className="text-center py-3">Copyright &copy; Conga  2023</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
