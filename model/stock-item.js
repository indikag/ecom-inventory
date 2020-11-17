const { DataTypes } = require('sequelize');
var sequelize = require('../utils/db-connection').sequelize;

const StockItem = sequelize.define({
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
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.STRING
    }
}, {
    // sequelize
    timestamps: false,
    tableName: 'stock_item'
});

module.exports = StockItem