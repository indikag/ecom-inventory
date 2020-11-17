const { DataTypes } = require('sequelize');
var sequelize = require('../utils/db-connection').sequelize;

const StockOut = sequelize.define('StockOut', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    product_id: {
        type: DataTypes.STRING
    },
    amount: {
        type: DataTypes.NUMBER
    },
    date: {
        type: DataTypes.DATE
    },
    cart_id: {
        type: DataTypes.STRING
    }
}, {
    // sequelize
    timestamps: false,
    tableName: 'stock_out'
});

module.exports = StockOut