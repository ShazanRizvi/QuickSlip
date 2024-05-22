const express = require('express');
const invoiceRoutes = require('./src/routes/invoiceRoutes');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(cors());

app.use('/invoices', invoiceRoutes);

const PORT = process.env.DATABASE_PORT || 5050;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
