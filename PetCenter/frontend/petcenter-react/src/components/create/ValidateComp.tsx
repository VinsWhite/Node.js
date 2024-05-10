import { Form, Row, Col, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { scrollToTop } from "../../assets/functions/scrollToTop";

export default function ValidateComp() {

    const [validated, setValidated] = useState(false);



    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        }

        setValidated(true);
    };

    // to scroll to top
    useEffect(() => {

        async function fetchData () {
            try {
                
            } catch (error) {
                console.error(error)
            }
        }

      scrollToTop();
      fetchData();
    }, [])
    

  return (
    <>
        <h2 className="mt-4">Set information about a new Pet!</h2>
        <Form noValidate validated={validated} onSubmit={handleSubmit} className="my-5 p-2 border border-2 border-warning rounded-2 shadow">
            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationCustom01">
                    <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter the name..."
                            defaultValue="John"
                        />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="validationCustom02">
                    <Form.Label>Description</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter the description..."
                            defaultValue="He's so cutieee"
                        />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group as={Col} md="4" controlId="validationCustom02">
                    <Form.Label>Species</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter the species..."
                            defaultValue="Cat"
                        />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                
            </Row>
            <Button variant="warning" type="submit">Create</Button>
        </Form>
    </>
  )
}
