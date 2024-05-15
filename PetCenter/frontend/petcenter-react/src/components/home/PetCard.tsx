import { NavLink } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { Pet } from '../../assets/interface/PetInterface';
import { Trash } from 'react-bootstrap-icons';
import axios from 'axios';
import { Toast} from 'primereact/toast';
import { useRef } from 'react';

interface PetCardProps {
    pet: Pet;
    onDelete: (petId: number) => void;
}

const PetCard: React.FC<PetCardProps> = ({ pet, onDelete }) => {
    const toast = useRef<Toast>(null);

    const handleClick = async () => {
        try {
            const response = await axios.delete(`http://localhost:3000/pet/${pet._id}`);
            // Handle successful deletion
            console.log('Pet deleted successfully', response.data);
            toast.current?.show({ severity: 'info', summary: 'Deleted', detail: 'Pet deleted successfully', life: 3000 });
            onDelete(pet._id);
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
