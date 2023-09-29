const Sequelize = require('sequelize')
const connect = require('../database')
const sequelize = connect()
const { enCode } = require('../../utils')
const VendorLegalsModel = require('./VendorLegalsModel')

const VendorLegalDocumentsModel = sequelize.define('vendorlegaldocuments', {
    vld_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    vl_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: VendorLegalsModel,
            key: 'vl_id'
        }
    },
    vld_name: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    vld_state: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    vld_datCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    vld_datMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false,
})

module.exports = VendorLegalDocumentsModel