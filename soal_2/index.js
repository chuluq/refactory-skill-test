const express = require('express');

const app = express();

// init Middleware
app.use(express.json());

app.get('/', (req, res) => res.send('Hello World'));

// Define Routes
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
