// Import necessary modules
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Route to handle POST requests at /bfhl
app.post('/bfhl', (req, res) => {
    const input = req.body.array; // Expecting input to have a key 'array'

    // Validate the input
    if (!input || !Array.isArray(input)) {
        return res.status(400).json({ error: 'Invalid input data. Expected a JSON with an array.' });
    }

    // Filter the input array to separate alphabets and numbers
    const alphabets = input.filter(item => isNaN(item) && /^[a-zA-Z]+$/.test(item));
    const numbers = input.filter(item => !isNaN(item));

    // Find the highest lowercase alphabet
    const lowercaseAlphabets = input.filter(item => /^[a-z]$/.test(item));
    const highestLowercaseAlphabet = lowercaseAlphabets.sort().pop() || 'None';

    // Send the response with the filtered results
    res.json({
        alphabets: alphabets,
        numbers: numbers,
        highest_lowercase_alphabet: highestLowercaseAlphabet
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
