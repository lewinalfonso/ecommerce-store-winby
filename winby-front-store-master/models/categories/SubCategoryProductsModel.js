const Sequelize = require('sequelize')
const connect = require('../database')
const sequelize = connect()
const { enCode } = require('../../utils')
const CategoryProductsModel = require('./CategoryProductsModel')

const SubCategoryProductsModel = sequelize.define('subcategoryproducts', {
    scp_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
    scp_name: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    scp_priority: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    scp_photo: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    scp_state: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    scp_datCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    scp_datMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false,
})

module.exports = SubCategoryProductsModel