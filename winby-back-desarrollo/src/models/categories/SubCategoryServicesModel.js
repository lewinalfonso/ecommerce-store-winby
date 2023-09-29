const Sequelize = require('sequelize')
const connect = require('../database')
const sequelize = connect()
const { enCode } = require('../../utils')
const CategoryServicesModel = require('./CategoryServicesModel')

const SubCategoryServicesModel = sequelize.define('subcategoryservices', {
    scs_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    cs_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: CategoryServicesModel,
            key: 'cs_id'
        },
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    scs_name: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    scs_priority: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    scs_photo: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    scs_state: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    scs_datCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    scs_datMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false,
})

module.exports = SubCategoryServicesModel