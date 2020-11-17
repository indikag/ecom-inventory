const { DataTypes } = require('sequelize');
var sequelize = require('../utils/db-connection').sequelize;
var Status = require('../utils/util').STOCK_ITEM_STATUS;

const StockItem = sequelize.define('StockItem', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    product_id: {
        type: DataTypes.STRING
    },
    stock_in_id: {
        type: DataTypes.STRING
    },
    stock_out_id: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING,
        default: Status.FREE.valueOf()
    }
}, {
    // sequelize
    timestamps: false,
    tableName: 'stock_item'
});

module.exports = StockItem