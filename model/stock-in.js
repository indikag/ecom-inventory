const { DataTypes } = require('sequelize');
var sequelize = require('../utils/db-connection').sequelize;

const StockIn = sequelize.define('stock-in', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    product_id: {
        type: DataTypes.STRING
    },
    quantity: {
        type: DataTypes.NUMBER
    },
    date: {
        type: DataTypes.DATE
    },
    status: {
        type: DataTypes.STRING
    }
}, {
   // sequelize
   timestamps: false,
   tableName: 'stock_in'
});

module.exports = StockIn