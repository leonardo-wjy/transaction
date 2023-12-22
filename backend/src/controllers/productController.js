class ProductController {
    constructor(productService) {
      this.productService = productService;
    }
  
    async getAllProducts(req, res) {
      try {
        const products = await this.productService.getAllProducts();
        res.json(products);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  }
  
  module.exports = ProductController;