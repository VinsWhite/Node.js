import { Container, Row, Col, Card } from "react-bootstrap";
import cartoonDog from '../../assets/img/cartoonDog.png';
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Plus } from "react-bootstrap-icons";

// interfaccia struttura dati
interface Pet {
    id: number;
    name: string;
    description: string;
    species: string;
}

export default function ServicesComp() {
    const [pets, setPets] = useState<Pet[]>([]); // <Pet[]> specifica che il tipo di stato sarà un array di oggetti dell'interfaccia Pet

    useEffect(() => {
        async function fetchData() {
          try {
            const response = await axios.get<{ data: { pet: Pet[] } }>('http://localhost:3000/pet'); // specifica il tipo di dati attesi
            console.log(response.data);
            setPets(response.data.data.pet); // impostiamo lo stato
          } catch (error) {
            console.error(error);
          }
        }
    
        fetchData();
    }, []);

    return (
        <>  
            <div className="p-5">
                <h2 className="fw-bold text-services">cards <NavLink className='text-decoration-none text-dark' to='/create'><Plus /></NavLink> </h2>
            </div>

            <Container className="my-3">
                <Row>
                    {pets.map((pet, index) => (
                        <Col key={index} xs={12} sm={6} md={4}>
                            <NavLink to='#' className='text-decoration-none'>
                                <Card className="text-center services mt-3 shadow">
                                    <Card.Body>
                                        <img src={cartoonDog} alt="dog" />
                                        <Card.Title className="fw-semibold mt-3 fs-3">{pet.name}</Card.Title>
                                        <Card.Text>{pet.description}</Card.Text>
                                        <Card.Text className="text-primary">{pet.species}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </NavLink>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}
