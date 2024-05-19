import { Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Plus } from "react-bootstrap-icons";
import { Pet } from "../../assets/interface/PetInterface"; //  Pet is an interface
import PetCard from "./PetCard";
import { Skeleton } from 'primereact/skeleton';

export default function ServicesComp() {
    const [pets, setPets] = useState<Pet[]>([]); // <Pet[]> specify what state type is, interface array of Pet
    const [loading, setLoading] = useState<boolean>(true);
    const [deleteCheckBox, setDeleteCheckBox] = useState<boolean>(false);
    
    useEffect(() => {
        async function fetchData() {
          try {
            const response = await axios.get<{ data: { pet: Pet[] } }>('http://localhost:3000/pet'); // specify the type
            console.log(response.data);

            setTimeout(() => {
                setPets(response.data.data.pet); // set the state
            setLoading(false);
            }, 3000);

            
          } catch (error) {
            console.error(error);
          }
        }
    
        fetchData();
    }, []);

    const handleDeletePet = (petId: number) => {
        // Filtra i pet rimuovendo quello con l'ID corrispondente
        const updatedPets = pets.filter(pet => pet._id !== petId);
        setPets(updatedPets); // Aggiorna lo stato con i pet aggiornati
    };

    return (
        <>  
            <div className="p-5">
                <h2 className="fw-bold text-services">cards <NavLink className='text-decoration-none text-dark' to='/create'><Plus /></NavLink> </h2>
            </div>

            <Container className="my-3">
                <p 
                    className="bg-light border p-1 rounded-2 mb-2 d-inline-block"
                    onClick={() => setDeleteCheckBox(!deleteCheckBox)}
                >
                    Delete
                </p>
                <Row>
                    {loading && (
                        <>
                            <Col xs={12} sm={6} md={4}>
                                <Skeleton width="22rem" height="11rem"></Skeleton>
                            </Col>
                            <Col xs={12} sm={6} md={4}>
                                <Skeleton width="22rem" height="11rem"></Skeleton>
                            </Col>
                            <Col xs={12} sm={6} md={4}>
                                <Skeleton width="22rem" height="11rem"></Skeleton>
                            </Col>
                        </>
                    )}
                    {pets.length >= 1 && pets.map((pet, index) => (
                        <Col key={index} xs={12} sm={6} md={4}>
                            <PetCard pet={pet} deleteCheckBox={deleteCheckBox} onDelete={handleDeletePet}/>
                        </Col>
                    ))}
                    {!loading && pets.length == 0 && (
                        <>
                            <Container>
                                <div className="text-center border border-dark rounded-4 p-4 services mx-3">
                                    <h2>There aren't pets yet...</h2>
                                    <p>Be the first one! Let's create a card!</p>
                                </div>
                            </Container>
                        </>
                    )}
                </Row>
            </Container>
        </>
    );
}
