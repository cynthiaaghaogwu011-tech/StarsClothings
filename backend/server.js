require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const adminRoutes = require('./routes/adminRoutes.js');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);
const PORT = process.env.PORT || 3000;

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};
startServer();
