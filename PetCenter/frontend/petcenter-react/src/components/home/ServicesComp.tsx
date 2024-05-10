import { Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Plus } from "react-bootstrap-icons";
import { Pet } from "../../assets/interface/PetInterface"; //  Pet is an interface
import PetCard from "./PetCard";

export default function ServicesComp() {
    const [pets, setPets] = useState<Pet[]>([]); // <Pet[]> specify what state type is, interface array of Pet
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        async function fetchData() {
          try {
            const response = await axios.get<{ data: { pet: Pet[] } }>('http://localhost:3000/pet'); // specify the type
            console.log(response.data);
            setPets(response.data.data.pet); // set the state
            setLoading(false);
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
                    {loading && (
                        <p>loading (just for now)...</p>
                    )}
                    {pets.map((pet, index) => (
                        <Col key={index} xs={12} sm={6} md={4}>
                            <PetCard pet={pet}/>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}
