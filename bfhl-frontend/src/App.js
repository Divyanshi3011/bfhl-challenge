import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';

function App() {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState(null);

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Validate JSON input
            const parsedInput = JSON.parse(input);

            // Proceed with the POST request
            const res = await axios.post('http://localhost:3001/bfhl', parsedInput);
            setResponse(res.data);
        } catch (err) {
            console.error(err);
            alert('Invalid JSON format. Please enter valid JSON.');
        }
    };

    return (
        <Container className="mt-5">
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Enter JSON Input</Card.Title>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="jsonInput">
                                    <Form.Label>JSON Input:</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder='{"array": ["a", "b", "c", "1", "2", "3", "D", "E"]}'
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="mt-3">
                                    Submit
                                </Button>
                            </Form>

                            {response && (
                                <Card className="mt-4">
                                    <Card.Body>
                                        <Card.Title>Output</Card.Title>
                                        <div><strong>Alphabets:</strong> {response.alphabets.join(', ')}</div>
                                        <div><strong>Numbers:</strong> {response.numbers.join(', ')}</div>
                                        <div><strong>Highest Lowercase Alphabet:</strong> {response.highest_lowercase_alphabet}</div>
                                    </Card.Body>
                                </Card>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
