const Sequelize = require('sequelize'),
    connect = require('../database'),
    UsersModel = require('./UsersModel'),
    ProductsModel = require('../products/ProductsModel'),
    { enCode } = require('../../utils'),
    sequelize = connect()

const UserStoreProductsModel = sequelize.define('userstoreproducts', {
    usp_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    u_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: UsersModel,
            key: 'u_id'
        },
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    p_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: ProductsModel,
            key: 'p_id'
        },
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    usp_row: {
        type: Sequelize.SMALLINT,
        allowNull: true,
        defaultValue: 1
    },
    usp_priority: {
        type: Sequelize.SMALLINT,
        allowNull: true,
        defaultValue: 1
    },
    usp_state: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    usp_datCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    usp_datMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false,
})

module.exports = UserStoreProductsModel