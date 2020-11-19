var express = require('express');
var router = express.Router();
var stockController = require('../controller/stock-controller');

/**
 * Get free stock count of a product by id.
 */
router.get('/stock/:productId', stockController.getBuyableItemCount);

/**
 * Reserve items and return item id list.
 */
router.put('/reserve', stockController.reserveItems);

/**
 * Purchase already reserved items and update stock-out table.
 */
router.put('/purchase', stockController.buyReservedItems);

/**
 * Add items to the stock-in and populate stock-item table.
 */
router.post('/add', stockController.addStock);

module.exports = router;