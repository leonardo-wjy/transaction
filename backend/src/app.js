const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const ProductController = require('./controllers/productController');
const ProductService = require('./services/productService');
const ProductRepository = require('./repositories/productRepository');

dotenv.config();

const app = express();

app.use(cors());

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

// Repositories
const productRepository = new ProductRepository(dbConfig);

// Services
const productService = new ProductService(productRepository);

// Controllers
const productController = new ProductController(productService);

// Routes
app.get('/api/products', (req, res) => productController.getAllProducts(req, res));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});