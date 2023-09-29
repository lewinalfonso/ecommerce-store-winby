const Sequelize = require('sequelize')
const connect = require('../database')
const sequelize = connect()
const { enCode } = require('../../utils')

const CategoryProductsModel = sequelize.define('categoryproducts', {
    cp_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    cp_name: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    cp_priority: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    cp_horPho: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    cp_verPho: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    cp_icon: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    cp_state: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    cp_datCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    cp_datMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false,
})

module.exports = CategoryProductsModel