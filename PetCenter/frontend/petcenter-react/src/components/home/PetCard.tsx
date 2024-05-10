import { NavLink } from "react-router-dom"
import { Card } from "react-bootstrap"
import { Pet } from "../../assets/interface/PetInterface"

interface PetCardProps { // in typescript we needed to do this!!
    pet: Pet;
}

const PetCard: React.FC<PetCardProps> = ({ pet }) => {
  return (
    <>
        <NavLink to='#' className='text-decoration-none'>
            <Card className="text-center services mt-3 shadow">
                <Card.Body>
                    <Card.Title className="fw-semibold mt-3 fs-3">{pet.name}</Card.Title>
                    <Card.Text>{pet.description}</Card.Text>
                    <Card.Text className="text-primary">{pet.species}</Card.Text>
                </Card.Body>
            </Card>
        </NavLink>
    </>
  )
}

export default PetCard;