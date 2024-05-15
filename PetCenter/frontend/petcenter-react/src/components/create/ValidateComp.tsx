import { Form, Row, Col, Button } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { scrollToTop } from "../../assets/functions/scrollToTop";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toast } from 'primereact/toast';
import { Checkbox } from 'primereact/checkbox';
import { Info } from "react-bootstrap-icons";

export default function ValidateComp() {

    const [validated, setValidated] = useState(false);
    const address: string = 'http://localhost:3000/pet';
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [species, setSpecies] = useState<string>('');
    const [isCreated, setIsCreated] = useState<boolean>();
    const [checked, setChecked] = useState<boolean>(false);
    const navigate = useNavigate();
    const toast = useRef<Toast>(null);

    useEffect(() => {
        // to scroll to top
        scrollToTop();
    }, [])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            return;
        }

        try {
            const response = await axios.post(address, {
                name: name,
                description: description,
                species: species
            });

            setIsCreated(true);
            toast.current?.show({ severity: 'info', summary: 'Created', detail: 'Pet created successfully', life: 3000 });
            console.log(response.data);
            setTimeout(() => {
                navigate('/');
                setIsCreated(false);
            }, 2000);
            
        } catch (error) {
            console.error(error);
            toast.current?.show({ severity: 'warn', summary: 'Rejected', detail: 'Action rejected', life: 3000 });
        }

        setValidated(false);
        setName('');
        setDescription('');
        setSpecies('');
    }
    

  return (
    <>
        <h2 className="mt-4">Set informations about a new Pet!</h2>
        {isCreated && (
            <p className='opacity-75'>You will be redirected shortly...</p>
        )}
        <Form noValidate validated={validated} onSubmit={handleSubmit} className="my-5 p-2 border border-2 border-warning rounded-2 shadow">
            <Row className="mb-3">
            <div className="d-flex">
                <Checkbox onChange={() => setChecked(checked)} checked={checked}></Checkbox>
                <p><Info /> More pets</p>
            </div>
                <Form.Group as={Col} md="4" controlId="validationCustom01">
                    <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter the name..."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="validationCustom02">
                    <Form.Label>Description</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter the description..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group as={Col} md="4" controlId="validationCustom02">
                    <Form.Label>Species</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter the species..."
                            value={species}
                            onChange={(e) => setSpecies(e.target.value)}
                        />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                
            </Row>
            <Button className="wiggle" variant="warning" type="submit">Create</Button>
        </Form>
        <Toast ref={toast} />
    </>
  )
}
