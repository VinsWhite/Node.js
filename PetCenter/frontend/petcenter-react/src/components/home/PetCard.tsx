import { NavLink } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { Pet } from '../../assets/interface/PetInterface';
import { Trash } from 'react-bootstrap-icons';
import axios from 'axios';

interface PetCardProps {
    pet: Pet;
}

const PetCard: React.FC<PetCardProps> = ({ pet }) => {

    const handleClick = async () => {
        try {
            const response = await axios.delete(`http://localhost:3000/pet/${pet._id}`);
            if (response.status === 200) {
                // Handle successful deletion
                console.log('Pet deleted successfully');
            } else {
                // Handle other status codes if needed
                console.error('Deletion failed');
            }
        } catch (error) {
            // Handle error
            console.error('Error deleting pet:', error);
        }
    };

    return (
        <>
            <NavLink to="#" className="text-decoration-none">
                <Card className="text-center services mt-3 shadow">
                    <Card.Body>
                        <p onClick={handleClick} className="text-danger d-flex justify-content-end">
                            <Trash />
                        </p>
                        <Card.Title className="fw-semibold mt-3 fs-3">{pet.name}</Card.Title>
                        <Card.Text>{pet.description}</Card.Text>
                        <Card.Text className="text-primary">{pet.species}</Card.Text>
                    </Card.Body>
                </Card>
            </NavLink>
        </>
    );
};

export default PetCard;
