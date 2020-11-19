const StockItemDal = require('../dal/stock-item-dal');
const StockInDal = require('../dal/stock-in-dal');
const StockOutDal = require('../dal/stock-out-dal');
const response = require('../utils/res');
const uniqid = require('uniqid');
const Status = require('../utils/util').STOCK_ITEM_STATUS;

/**
 * Get stock item count by product id and status = FREE.
 * @param {http request} req
 * @param {http response} res 
 * @param {http next} next 
 */
exports.getBuyableItemCount = (req, res, next) => {
    const productId = req.params.productId;
    StockItemDal.getItemCount(productId).then(itemList => {
        response.success(res, itemList.length === undefined ? 0 : itemList.length);
    }).catch(reason => {
        response.error(res, reason.toString());
    });
}

/**
 * Add a new stock to the inventory.
 * @param {http request} req
 * @param {http response} res 
 * @param {http next} next  
 */
exports.addStock = (req, res, next) => {
    let productId = req.body.id;
    let productCount = req.body.count;

    //add entry to stock-in table
    StockInDal.addStockIn(productId, productCount).then(stockin => {
        //add items to stock-items
        let items = [];
        for (let index = 0; index < productCount; index++) {
            items.push({ id: uniqid(), product_id: productId, stock_in_id: stockin.id, status: Status.FREE });
        }

        StockItemDal.addItemBulk(items).then(data => {
            response.success(res);
        }).catch(reason => {
            response.error(res, reason.toString());
        });
    }).catch(reason => {
        response.error(res, reason.toString());
    });
}

/**
 * Reserve items from the stock for buying.
 * @param {http request} req
 * @param {http response} res 
 * @param {http next} next  
 */
exports.reserveItems = (req, res, next) => {
    let itemCount = req.body.count;
    let productId = req.body.id;
    let idList = [];

    StockItemDal.getItemsByProductIdStatusAndQuantity(productId, Status.FREE, itemCount).then(itemList => {
        if (itemList.length === 0) {
            response.error(res, 'Out of stock');
            return;
        }

        if (itemList.length < itemCount) {
            response.error(res, 'Requested item count not available in the stock');
            return;
        }

        const idList = itemList.map(item => item.id);

        StockItemDal.updateItemListStatus(idList, Status.RESERVED).then(data => {
            response.success(res, idList);
        }).catch(reason => {
            response.error(res, reason.toString());
        });

    }).catch(reason => {
        response.error(res, reason.toString());
    });
}

/**
 * Buying reserved items.
 * @param {http request} req
 * @param {http response} res 
 * @param {http next} next  
 */
exports.buyReservedItems = (req, res, next) => {
    let reservedList = req.body.ids;
    let productId = req.body.product_id;
    let cartId = req.body.cart_id;

    // check ids are correct
    StockItemDal.findAllByItemIds(reservedList).then(itemList => {
        if (itemList.length !== reservedList.length) {
            response.badrequest(res)
        }

        // check status are correct
        const filterByStatus = itemList.filter(item => item.status === Status.RESERVED);
        if (filterByStatus.length !== reservedList.length) {
            response.error(res)
        }

        StockItemDal.updateItemListStatus(reservedList, Status.PURCHASED).then(list => {
            //completed the item status update
            StockOutDal.addStockOut(productId, reservedList.length, cartId).then(item => {
                response.success(res, item);
            }).catch(reason => {
                response.error(res, reason.toString());
            })
        }).catch(reason => {
            response.error(res, reason.toString());
        });

    }).catch(reason => {
        response.error(res, reason.toString());
    });

}