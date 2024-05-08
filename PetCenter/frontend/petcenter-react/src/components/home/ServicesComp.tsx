import { Container, Row, Col, Card } from "react-bootstrap";
import cartoonDog from '../../assets/img/cartoonDog.png';
import cartoonCat from '../../assets/img/cartoonCat.png';
import cartoonParrot from '../../assets/img/cartoonParrot.png';
import { NavLink } from "react-router-dom";

export default function ServicesComp() {
  return (
    <>  
        <div className="p-5">
            <h2 className="fw-bold text-services">services</h2>
        </div>

        <Container className="my-3">
            <Row>
                <Col xs={12} sm={6} md={4}>
                    <NavLink to='#' className='text-decoration-none'>
                        <Card className="text-center services mt-3 shadow">
                            <Card.Body>
                                <img src={cartoonDog} alt="dog" />
                                <Card.Title className="fw-semibold mt-3 fs-3">Dogs</Card.Title>
                            </Card.Body>
                        </Card>
                    </NavLink>
                </Col>
                <Col xs={12} sm={6} md={4}>
                    <NavLink to='#' className='text-decoration-none'>
                        <Card className="text-center services mt-3 shadow">
                            <Card.Body>
                                <img src={cartoonCat} alt="cat" />
                                <Card.Title className="fw-semibold mt-3 fs-3">Cat</Card.Title>
                            </Card.Body>
                        </Card>
                    </NavLink>
                </Col>
                <Col xs={12} sm={6} md={4}>
                    <NavLink to='#' className='text-decoration-none'>
                        <Card className="text-center services mt-3 shadow">
                            <Card.Body>
                                <img src={cartoonParrot} alt="parrot" />
                                <Card.Title className="fw-semibold mt-3 fs-3">Parrot</Card.Title>
                            </Card.Body>
                        </Card>
                    </NavLink>
                </Col>
            </Row>
        </Container>
    </>
  )
}
