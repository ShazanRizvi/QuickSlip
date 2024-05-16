const express = require('express');
const invoiceRoutes = require('./src/routes/invoiceRoutes');
const app = express();
require('dotenv').config();

app.use(express.json());

app.use('/invoices', invoiceRoutes);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(process.env.PORT)
});
