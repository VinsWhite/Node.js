import { NavLink } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { Pet } from '../../assets/interface/PetInterface';
import { Pen, Trash } from 'react-bootstrap-icons';
import axios from 'axios';
import { Toast} from 'primereact/toast';
import { useRef } from 'react';

interface PetCardProps {
    pet: Pet;
    onDelete: (petId: number) => void;
    deleteCheckBox: boolean;
    editCheckBox: boolean;
}

const PetCard: React.FC<PetCardProps> = ({ pet, onDelete, deleteCheckBox, editCheckBox }) => {
    const toast = useRef<Toast>(null);

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:3000/pet/${pet._id}`);
            // Handle successful deletion
            console.log('Pet deleted successfully', response.data);
            toast.current?.show({ severity: 'info', summary: 'Deleted', detail: 'Pet deleted successfully', life: 3000 });
            onDelete(pet._id);
        } catch (error) {
            // Handle error
            console.error('Error deleting pet: ', error);
        }
    };

    // i need to open a modal first!!
    const handleEdit = async () => {
        try {
            const response = await axios.patch(`http://localhost:3000/pet/${pet._id}`);
            console.log(response.data);
        } catch (error) {
            console.error('Error editing pet: ', error)
        }
    }

    return (
        <>
            <NavLink to="#" className="text-decoration-none">
            <Card className={`text-center services mt-3 shadow position-relative ${editCheckBox ? 'constantWiggle' : ''} ${deleteCheckBox ? 'constantWiggle' : ''}`}>
                    <Card.Body>
                        <p onClick={handleDelete} className={`text-dark d-flex position-absolute top-0 end-0 p-1 justify-content-end ${deleteCheckBox ? 'd-block' : 'd-none'}`}>
                            <Trash />
                        </p>
                        <p onClick={handleEdit} className={`text-dark d-flex position-absolute top-0 end-0 p-1 justify-content-end ${editCheckBox ? 'd-block' : 'd-none'}`}>
                            <Pen />
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
