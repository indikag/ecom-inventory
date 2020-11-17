var express = require('express');
var router = express.Router();
var StockIn = require('../model/stock-in');
var StockOut = require('../model/stock-out');
var StockItem = require('../model/stock-item');
var itemStatus = require('../utils/util').STOCK_ITEM_STATUS;
var uniqid = require('uniqid');
const { count } = require('../model/stock-in');

/**
 * Get free stock count of a product by id.
 */
router.get('/stock/:productId', function (req, res, next) {

    res.send();
});

/**
 * Reserve items and return item id list.
 */
router.put('/reserve', function (req, res, next) {
    let itemCount = req.body.count;
    let productId = req.body.id;
    let idList = [];
    //conditions
    //There must be more than itemCount
    StockItem.findAll({ where: { product_id: productId, status: itemStatus.FREE } }).then(items => {
        if (items.length === 0) {
            res.status(500).send('Out of stock');
            return;
        }

        if (items.length < itemCount) {
            res.status(500).send('Requested item count not available in the stock');
            return;
        }

        for (let index = 0; index < itemCount; index++) {
            const item = items[index];
            idList.push(item.id);
        }

        StockItem.update({ status: itemStatus.RESERVED }, {
            where: {
                id: idList
            }
        }).then(data => {
            res.send(idList);
        }).catch(error => {
            console.log(error);
            res.status(500).send(error)
        });
    });

});

/**
 * Purchase already reserved items and update stock-out table.
 */
router.put('/purchase', function (req, res, next) {
    res.send(itemStatus.FREE);
});

/**
 * Add items to the stock-in and populate stock-item table.
 */
router.post('/add', function (req, res, next) {
    let productId = req.body.id;
    let productCount = req.body.count;

    // add items to the stock-in table then populate the stock-item table
    let stockIn = { id: uniqid(), product_id: productId, quantity: productCount }
    StockIn.create(stockIn).then((val) => {
        // create items for the entry
        let items = [];
        for (let index = 0; index < productCount; index++) {
            items.push({ id: uniqid(), product_id: productId, stock_in_id: val.id, status: itemStatus.FREE });
        }
        StockItem.bulkCreate(items).then((val) => {
            res.send();
        }).catch(e => {
            res.status(500).send(e)
        });
    }
    ).catch((e) => {
        res.status(500).send(e)
    });
});

module.exports = router;