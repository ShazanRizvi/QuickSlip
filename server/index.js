const express = require('express');
const invoiceRoutes = require('./src/routes/invoiceRoutes');
const authRoutes = require('./src/routes/authRoutes');
const cors = require('cors');
const app = express();
const path = require('path');
//const { auth } = require('./src/supabaseClient');
require('dotenv').config();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));



app.use('/api', invoiceRoutes);
app.use('/auth', authRoutes);
app.use('/public', express.static('public'));
app.get('/', (req, res) => {
    res.send('Welcome to the Invoice Generator API');
});

const PORT = process.env.DATABASE_PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
