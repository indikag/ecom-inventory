var StockOut = require('../model/stock-out');
var uniqid = require('uniqid');

async function addStockOut(productId, productCount, cart_id) {
    let stockIn = { id: uniqid(), product_id: productId, quantity: productCount, cart_id: cart_id, date: new Date() }
    return await StockOut.create(stockIn);
}

module.exports = { addStockOut }