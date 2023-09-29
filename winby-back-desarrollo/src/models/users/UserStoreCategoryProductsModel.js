const Sequelize = require('sequelize')
const connect = require('../database')
const UsersModel = require('./UsersModel')
const CategoryProductsModel = require('../categories/CategoryProductsModel')
const { enCode } = require('../../utils')
const sequelize = connect()

const UserStoreCategoryProductsModel = sequelize.define('userstorecategoryproducts', {
    uscp_id: {
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
    cp_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: CategoryProductsModel,
            key: 'cp_id'
        },
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    uscp_priority: {
        type: Sequelize.SMALLINT(6),
        allowNull: true,
        defaultValue: 1
    },
    uscp_state: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    uscp_datCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    uscp_datMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false,
})

module.exports = UserStoreCategoryProductsModel