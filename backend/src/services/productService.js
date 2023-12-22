class ProductService {
    constructor(productRepository) {
      this.productRepository = productRepository;
    }
  
    async getAllProducts() {
      try {
        const products = await this.productRepository.getAllProducts();
        return products;
      } catch (error) {
        throw error;
      }
    }
  }
  
  module.exports = ProductService;