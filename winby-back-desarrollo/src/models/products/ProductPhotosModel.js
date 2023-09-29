const Sequelize = require('sequelize')
const connect = require('../database')
const sequelize = connect()
const { enCode } = require('../../utils')
const ProductsModel = require('./ProductsModel')

const ProductPhotosModel = sequelize.define('productphotos', {
    pp_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
        }
    },
    pp_name: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    pp_cover: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    pp_state: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    pp_datCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    pp_datMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false,
})

module.exports = ProductPhotosModel