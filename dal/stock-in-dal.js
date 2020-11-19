var StockIn = require('../model/stock-in');
var uniqid = require('uniqid');

/**
 * Add an entry to the stock-in table.
 * @param {string} productId 
 * @param {number} productCount 
 */
async function addStockIn(productId, productCount) {
    let stockIn = { id: uniqid(), product_id: productId, quantity: productCount }
    return await StockIn.create(stockIn);
}

module.exports = { addStockIn }