/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('products', function (table) {
      table.increments('id').primary();
      table.string('name');
      table.integer('price');
    })
    .then(() => {
      // Insert a row with values (1, 'tes', 20000) into the products table
      return knex('products').insert([{ id: 1, name: 'Buku', price: 30000 },{ id: 2, name: 'Pensil', price: 3000 },{ id: 3, name: 'Penggaris', price: 10000 }]);
    });
};
  
exports.down = function (knex) {
    return knex.schema.dropTable('products');
};
