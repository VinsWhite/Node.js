import { Container, Row, Col } from "react-bootstrap";
import coolDog from '../../assets/img/cooldog.png';

export default function HeroComp() {
  return (
    <>
        <Container fluid className='bg-warning p-5 hero'>
            <Row>
                <Col xs={8} className="d-flex justify-content-center flex-column">
                    <h5 className='opacity-75'>Play now!</h5>
                    <h2 className="fw-semibold">Play with these adorable pets</h2>
                </Col>
                <Col xs={4}>
                    <img src={coolDog} alt="cool dog hero" />
                </Col>
            </Row>
        </Container>
    </>
  )
}
