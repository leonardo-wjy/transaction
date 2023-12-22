const mysql = require('mysql');
const util = require('util');
const { promisify } = require('util');

class ProductRepository {
  constructor(config) {
    this.connection = mysql.createConnection(config);
    this.queryAsync = promisify(this.connection.query).bind(this.connection);
  }

  async getAllProducts() {
    const sql = 'SELECT * FROM products';
    try {
      const results = await this.queryAsync(sql);
      return results;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProductRepository;