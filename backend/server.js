require('dns').setServers(['8.8.8.8', '1.1.1.1']);
require('dotenv').config();
const { Resend } = require("resend"); //Load resend tool from installed resend package.
const resend = new Resend(process.env.RESEND_API_KEY);
console.log("Resend API key loaded:", !!process.env.RESEND_API_KEY);
const express = require('express');
const cors = require('cors');
const allowedOrigins = [
  'http://localhost:5500',
  'http://127.0.0.1:5500',
  'https://glowing-cuchufli-4f0f97.netlify.app'
];
const connectDB = require('./config/db');
const contactRoutes = require("./routes/contactRoutes");
const productRoutes = require('./routes/productRoutes');
const adminRoutes = require('./routes/adminRoutes.js');
const orderRoutes = require('./routes/orderRoutes');
const helmet = require("helmet"); //Helmet is a collection of middleware functions that help secure my Express application by settling various HTTP headers. 

const app = express();
app.set("trust proxy", 1);
app.use(helmet());
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.use('/api/contact', contactRoutes);
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/orders', orderRoutes);
const PORT = process.env.PORT || 3000;

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};
startServer();
