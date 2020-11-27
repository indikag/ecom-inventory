const { Sequelize } = require('sequelize');
var StockItem = require('../model/stock-item');
const db = require('../utils/db-connection');
var Status = require('../utils/util').STOCK_ITEM_STATUS;


/**
 * Get all stock 
 */
async function getAllStocks() {
    var rawQuery = "select product_id, SUM(case when stock_item.status = 'free' then 1 else 0 end) as free, SUM(case when stock_item.status <> 'free' then 1 else 0 end) as purchased from stock_item group by product_id;"
    return await db.sequelize.query(rawQuery, { type: db.sequelize.QueryTypes.SELECT });
}

/**
 * Get free item count by product id.
 * @param {product id} productId 
 */
async function getItemCount(productId) {
    return await StockItem.findAll({
        where: {
            //conditions
            product_id: productId,
            status: Status.FREE
        }
    })
}

/**
 * Update status of stock item list.
 * @param {array} idList ['id1','id2']
 * @param {string} status FREE,PURCHASED, RESERVED etc
 */
async function updateItemListStatus(idList, status) {
    return await StockItem.update({ status: status }, {
        where: {
            id: idList
        }
    });
}

/**
 * Get all items by stock-item id.
 * @param {array} id stock-item id list
 */
async function findAllByItemIds(id) {
    return await StockItem.findAll({
        where: {
            id: id
        }
    });
}

/**
 * Add array of stock items.
 * @param {array} stockItemList 
 */
async function addItemBulk(stockItemList) {
    return await StockItem.bulkCreate(stockItemList);
}

/**
 * Get stock item by product id, status and quantity. If the available quantity
 * is lower than requested then available quantity will be returned.
 * @param {string} productId 
 * @param {enum} status 
 * @param {number} quantity 
 */
async function getItemsByProductIdStatusAndQuantity(productId, status, quantity) {
    return await StockItem.findAll({ where: { product_id: productId, status: status }, limit: quantity });
}

module.exports = { getItemCount, updateItemListStatus, findAllByItemIds, addItemBulk, getItemsByProductIdStatusAndQuantity, getAllStocks }
