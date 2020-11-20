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
    quantity: {
        type: DataTypes.NUMBER
    },
    date: {
        type: DataTypes.DATE
    },
    cart_id: {
        type: DataTypes.STRING,
        defaultValue: new Date()
    }
}, {
    // sequelize
    timestamps: false,
    tableName: 'stock_out'
});

module.exports = StockOut